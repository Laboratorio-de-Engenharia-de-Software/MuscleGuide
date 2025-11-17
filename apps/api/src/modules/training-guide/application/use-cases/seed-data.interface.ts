// app/api/src/modules/training-guide/application/use-cases/seed-data.interface.ts

// 🚨 INTERFACE PARA OS DADOS DE ENTRADA DO SEED

interface RawSetData {
    min: number;
    max: number;
    repsMin: number;
    repsMax: number;
    restTimeSeconds: number;
}

interface RawExerciseData {
    id: string;
    name: string;
    gifUrl: string;
    isBasic: boolean;
    targetGroups: string[];
}

interface RawWorkoutItem {
    id: string;
    name: string; 
    order?: number;
    gifUrl: string;
    isBasic: boolean;
    targetGroups: string[];
    sets: {
        series: number;
        repetitions: number;
        restTimeSeconds: number;
    };
}

interface RawTrainingSession {
    sessionName: string;
    focus: 'MASS_GAIN' | 'WEIGHT_LOSS' | 'MAINTENANCE';
    workoutItems: RawWorkoutItem[]; // Lista de itens (com a estrutura acima)
    alternatives: { [key: string]: string[] | undefined};
}

interface RawTrainingData {
    workoutName: string;
    description: string;
    trainingSessions: RawTrainingSession[];
}
