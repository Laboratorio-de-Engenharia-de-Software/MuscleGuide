import { Module, Provider } from '@nestjs/common';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { PrismaService } from '@shared/prisma/prisma.service';

// --- Imports de Domínio ---
import { IExerciseRepository, EXERCISE_REPOSITORY_TOKEN } from './domain/repositories/exercise.repository';
import { IWorkoutRepository, WORKOUT_REPOSITORY_TOKEN } from './domain/repositories/workout.repository';
// --- Imports de Infraestrutura/Application ---
import { ExercisePrismaRepository } from './infrastructure/persistence/exercise.prisma.repository';
import { WorkoutPrismaRepository } from './infrastructure/persistence/workout.prisma.repository';
import { SeedExercisesUseCase } from 'modules/training-guide/application/use-cases/seed-exercises.usecases';
import { SeedController } from 'modules/training-guide/infrastructure/controllers/seed.controller';

const RepositoryProviders: Provider[] = [
  // Repositório de Exercícios
  {
    provide: EXERCISE_REPOSITORY_TOKEN,
    // 🚨 CORREÇÃO: Usar useFactory para forçar a injeção do PrismaService (dependência no índice 0)
    useFactory: (prisma: PrismaService) => new ExercisePrismaRepository(prisma),
    inject: [PrismaService],
  },
  // Repositório de Treinos
  {
    provide: WORKOUT_REPOSITORY_TOKEN,
    useFactory: (prisma: PrismaService) => new WorkoutPrismaRepository(prisma),
    inject: [PrismaService],
  },
];

// --- 2. Definição do Provider de Seed (Application) ---
const ApplicationProviders: Provider[] = [
    SeedExercisesUseCase,
    // Adicionar outros Use Cases aqui (GetNextWorkoutUseCase, etc.)
];


@Module({
  imports: [PrismaModule], // Importa o PrismaService
  controllers: [SeedController], // Controller para acionar o povoamento
  providers: [
    // 🚨 Manter PrismaService aqui para garantir que ele esteja no container
    PrismaService, 
    ...RepositoryProviders,
    ...ApplicationProviders,
  ],
  // Exportamos os contratos de Repositório para que outros módulos possam usá-los
  exports: [EXERCISE_REPOSITORY_TOKEN, WORKOUT_REPOSITORY_TOKEN],
})
export class TrainingGuideModule {}