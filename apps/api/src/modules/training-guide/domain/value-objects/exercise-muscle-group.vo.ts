export enum MuscleGroup {
    CHEST ='PEITO',
    BACK = 'COSTAS',
    LEGS = 'PERNAS',
    SHOULDERS = 'OMBRO',
    BICEPS = 'BICEPS',
    TRICEPS = 'TRICEPS',
    CORE = 'CORE',
    CALVES = 'PANTURRILHAS',
}

export class ExerciseMuscleGroup {
    private readonly group: MuscleGroup

    private constructor(group: MuscleGroup) {
        this.group = group;
    }

    public static create(group: MuscleGroup): ExerciseMuscleGroup {
        if (!Object.values(MuscleGroup).includes(group)) {
            throw new Error(`Grupo muscular inválido: ${group}`)
        }
        return new ExerciseMuscleGroup(group);
    }

    public getValue(): MuscleGroup {
        return this.group;
    }
}