import { Workout } from "../entities/workout.entity";

export interface IWorkoutRepository {
    findById(id: string): Promise<Workout | null>;

    findAll(): Promise<Workout[]>;
    
    save(workout: Workout): Promise<Workout>;

    delete(id: string): Promise<void>
}

export const WORKOUT_REPOSITORY_TOKEN = Symbol('IWorkoutRepository');