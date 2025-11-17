import { Injectable } from "@nestjs/common";
// 🚨 CORREÇÃO 1: Importar os tipos diretamente de @prisma/client, incluindo $Enums
import { Prisma, PrismaClient, MuscleGroup as PrismaMuscleGroup } from "@prisma/client";
import { PrismaService } from "@shared/prisma/prisma.service";
import { Exercise, ExerciseProps } from "modules/training-guide/domain/entities/exercuse.entity";
import { IExerciseRepository } from "modules/training-guide/domain/repositories/exercise.repository";
// Importa o ENUM do Domínio, renomeado para evitar conflito
import { MuscleGroup as DomainMuscleGroup, ExerciseMuscleGroup } from "modules/training-guide/domain/value-objects/exercise-muscle-group.vo";

// O tipo correto para a criação de um relacionamento aninhado
type TargetCreateInput = Prisma.ExerciseMuscleTargetCreateWithoutExerciseInput;


const DomainToPrismaMuscleMap: Record<DomainMuscleGroup, string> = {
    [DomainMuscleGroup.CHEST]: 'CHEST',
    [DomainMuscleGroup.BACK]: 'BACK',
    [DomainMuscleGroup.LEGS]: 'LEGS',
    [DomainMuscleGroup.SHOULDERS]: 'SHOULDERS',
    [DomainMuscleGroup.BICEPS]: 'BICEPS',
    [DomainMuscleGroup.TRICEPS]: 'TRICEPS',
    [DomainMuscleGroup.CORE]: 'CORE',
    [DomainMuscleGroup.CALVES]: 'CALVES',
};

const PrismaToDomainMuscleMap: Record<string, DomainMuscleGroup> = {
    'CHEST': DomainMuscleGroup.CHEST,
    'BACK': DomainMuscleGroup.BACK,
    'LEGS': DomainMuscleGroup.LEGS,
    'SHOULDERS': DomainMuscleGroup.SHOULDERS,
    'BICEPS': DomainMuscleGroup.BICEPS,
    'TRICEPS': DomainMuscleGroup.TRICEPS,
    'CORE': DomainMuscleGroup.CORE,
    'CALVES': DomainMuscleGroup.CALVES,
    // Adicione todos os seus ENUMs aqui
};

type PrismaExercise = {
    id: string;
    name: string;
    gifUrl: string;
    isBasic: boolean;
};

type ExerciseWithTargets = PrismaExercise & { targets: { muscleGroup: PrismaMuscleGroup }[] };

@Injectable()
export class ExercisePrismaRepository implements IExerciseRepository {
    constructor(private readonly prisma: PrismaService | PrismaClient) { }

    private toDomain(prismaExercise: ExerciseWithTargets): Exercise {
        const targetGroups = prismaExercise.targets.map(target => {
        const domainValue = PrismaToDomainMuscleMap[target.muscleGroup]; 
        
        // O VO agora recebe a string em português que ele consegue validar
        return ExerciseMuscleGroup.create(domainValue);
    });

        const props: ExerciseProps = {
            id: prismaExercise.id,
            name: prismaExercise.name,
            gifUrl: prismaExercise.gifUrl,
            isBasic: prismaExercise.isBasic,
            targetGroups: targetGroups
        };

        return Exercise.createNew(props);
    }

    private toPrisma(domainExercise: Exercise): PrismaExercise & { targets: TargetCreateInput[] } {
        const groups = domainExercise.getTargetGroups().map(group => ({
            muscleGroup: DomainToPrismaMuscleMap[group.getValue()]
        }));

        return {
            id: domainExercise.getId(),
            name: domainExercise.getName(),
            gifUrl: domainExercise.getGifUrl(),
            isBasic: domainExercise.isBasic(),
            targets: groups as TargetCreateInput[],
        };
    }

    async findById(id: string): Promise<Exercise | null> {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id },
            include: { targets: true }
        });

        return exercise ? this.toDomain(exercise as ExerciseWithTargets) : null;
    }

    async findByMuscleGroup(group: DomainMuscleGroup): Promise<Exercise[]> {
        const exercises = await this.prisma.exercise.findMany({
            where: {
                targets: {
                    some: { muscleGroup: group as unknown as PrismaMuscleGroup }
                }
            },
            include: { targets: true }
        });

        return exercises.map(ex => this.toDomain(ex as ExerciseWithTargets));
    }

    async save(exercise: Exercise): Promise<Exercise> {
        const prismaData = this.toPrisma(exercise);
        const { targets, ...data } = prismaData;

        const saved = await this.prisma.exercise.upsert({
            where: { id: exercise.getId() },
            update: {
                ...data,
                // Aqui seria a lógica complexa de targets
            },
            create: {
                ...data,
                targets: {
                    create: targets,
                }
            },
            include: { targets: true }
        });

        return this.toDomain(saved as ExerciseWithTargets);
    }

    async findAll(): Promise<Exercise[]> {
        const exercises = await this.prisma.exercise.findMany({
            include: { targets: true }
        });

        return exercises.map(ex => this.toDomain(ex as ExerciseWithTargets));
    }
}