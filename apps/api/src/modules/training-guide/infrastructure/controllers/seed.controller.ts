// app/api/src/modules/training-guide/infrastructure/controllers/seed.controller.ts

import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedExercisesUseCase } from 'modules/training-guide/application/use-cases/seed-exercises.usecases';

@Controller('v1/admin/seed')
export class SeedController { // 🚨 ESTA CLASSE PRECISA SER EXPORTADA
  constructor(private readonly seedExercisesUseCase: SeedExercisesUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async seedDatabase() {
    await this.seedExercisesUseCase.execute();
    return { 
        message: 'Database populado com exercícios e grades de treino com sucesso.',
        status: 'completed'
    };
  }
}