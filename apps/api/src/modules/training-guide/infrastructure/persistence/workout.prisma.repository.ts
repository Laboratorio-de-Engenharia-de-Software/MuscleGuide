import { Injectable } from "@nestjs/common";
// Importar Set.create para resolver o erro "Property 'create' does not exist on type 'SetConstructor'"
import { Set } from "modules/training-guide/domain/value-objects/set.vo";
import { Prisma, PrismaClient, Workout as PrismaWorkout, WorkoutFocus as PrismaWorkoutFocus } from "@prisma/client"; import { PrismaService } from "@shared/prisma/prisma.service";
import { WorkoutProps, Workout } from "modules/training-guide/domain/entities/workout.entity";
import { IWorkoutRepository } from "modules/training-guide/domain/repositories/workout.repository";
import { WorkoutFocusVO } from "modules/training-guide/domain/value-objects/workout-focus.vo";

// O tipo de dado esperado pelo Prisma para um Workout, incluindo items
type WorkoutWithItems = PrismaWorkout & {
    // Garante que a query inclua itens, e que a tipagem esteja correta
    items: {
        id: string;
        exerciseId: string;
        series: number;
        repetitions: number;
        restTimeSeconds: number;
        order: number;
    }[];
};
@Injectable()
export class WorkoutPrismaRepository implements IWorkoutRepository {
    // Usamos PrismaService, que herda todas as funções do PrismaClient
    constructor(private readonly prisma: PrismaService) { }

    // --- Mapeamento para Domínio (Leitura) ---
    private toDomain(prismaWorkout: WorkoutWithItems): Workout {
        // Mapear os itens e sets de volta para as Entidades/VOs de Domínio
        const workoutItems = prismaWorkout.items.map(item => ({
            id: item.id,
            exercise: { id: item.exerciseId } as any, // Placeholder: Repositórios não carregam agregados aninhados!
            sets: Set.create({
                series: item.series,
                repetitions: item.repetitions,
                restTimeSeconds: item.restTimeSeconds
            }),
            order: item.order,
        }));

        const props: WorkoutProps = {
            id: prismaWorkout.id,
            name: prismaWorkout.name,
            description: prismaWorkout.description,
            items: workoutItems as any,
            focus: prismaWorkout.focus as unknown as WorkoutFocusVO,
        };

        return Workout.createNew(props); // Método de recriação do Agregado
    }

    // --- Mapeamento para Persistência (Escrita) ---
    // app/api/src/modules/training-guide/infrastructure/persistence/workout.prisma.repository.ts

private toPrisma(domainWorkout: Workout): Prisma.WorkoutCreateInput {
    // Mapear WorkoutItems aninhados
    const items = domainWorkout.getItems().map(item => {
        const setsInstance = item.getSets(); 

        return ({
            order: item.getOrder(),
            series: setsInstance.getSeries(), 
            repetitions: setsInstance.getRepetitions(),
            restTimeSeconds: setsInstance.getRestTimeSeconds(),
            exercise: { connect: { id: item.getExercise().getId() } },
        });
    });

    return {
        id: domainWorkout.getId(),
        name: domainWorkout.getName(),
        description: domainWorkout.getDescription(),
        focus: domainWorkout.getFocus().getValue() as unknown as PrismaWorkoutFocus,
        items: { create: items },
    };
}

    // --- Implementação da Interface ---

    async findById(id: string): Promise<Workout | null> {
        const workout = await this.prisma.workout.findUnique({
            where: { id },
            include: { items: true },
        });
        return workout ? this.toDomain(workout as WorkoutWithItems) : null;
    }

    async save(workout: Workout): Promise<Workout> {
        const prismaData = this.toPrisma(workout);

        // Usamos create para o MVP, pois os treinos são geralmente criados uma vez
        const saved = await this.prisma.workout.create({
            data: prismaData,
            include: { items: true },
        });

        return this.toDomain(saved as WorkoutWithItems);
    }

    async findAll(): Promise<Workout[]> {
        // Para MVP, pode retornar um array vazio se não houver lógica de leitura complexa
        return [];
    }

    async delete(id: string): Promise<void> {
        // Para MVP, implemente a remoção no Prisma
        await this.prisma.workout.delete({ where: { id } });
    }
}