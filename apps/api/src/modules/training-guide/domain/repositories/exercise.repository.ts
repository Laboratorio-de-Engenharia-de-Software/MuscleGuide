import { Exercise } from "../entities/exercuse.entity";
import { MuscleGroup } from "../value-objects/exercise-muscle-group.vo";

export interface IExerciseRepository {
    findById(id: string): Promise<Exercise | null>;

    findByMuscleGroup(group: MuscleGroup): Promise<Exercise[]>;

    save(exercise: Exercise): Promise<Exercise>;

    findAll(): Promise<Exercise[]>;
}

export const EXERCISE_REPOSITORY_TOKEN = Symbol('IExerciseRepository')