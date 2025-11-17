// Define o ENUM de persistência, alinhado com o schema.prisma
export enum WorkoutFocus {
    MASS_GAIN = 'MASS_GAIN',        // Ganho de Massa
    WEIGHT_LOSS = 'WEIGHT_LOSS',    // Perda de Peso
    MAINTENANCE = 'MAINTENANCE',    // Sair do Sedentarismo
}

export class WorkoutFocusVO {
    private readonly focus: WorkoutFocus;

    private constructor(focus: WorkoutFocus) {
        this.focus = focus;
    }

    public static create(focus: WorkoutFocus): WorkoutFocusVO {
        if (!Object.values(WorkoutFocus).includes(focus)) {
            throw new Error(`Foco de treino inválido: ${focus}`);
        }
        return new WorkoutFocusVO(focus);
    }

    public getValue(): WorkoutFocus {
        return this.focus;
    }
}