import { Set } from "../value-objects/set.vo";
import { WorkoutFocus, WorkoutFocusVO } from "../value-objects/workout-focus.vo";
import { Exercise } from "./exercuse.entity";

// ----------------------------------------------------
// ENTIDADE ANINHADA: WORKOUT ITEM
// ----------------------------------------------------

export interface WorkoutItemProps {
    id: string;
    // 🚨 Tipado com Agregados e VOs do Domínio
    exercise: Exercise; 
    sets: Set;
    order: number;
}

class WorkoutItem {
    private props: WorkoutItemProps;

    constructor(props: WorkoutItemProps) {
        this.props = props;
    }
    
    // 🚨 GETTERS CORRIGIDOS: Expondo as propriedades para o Repositório
    public getId(): string { return this.props.id; }
    public getOrder(): number { return this.props.order; }
    public getSets(): Set { return this.props.sets; }
    public getExercise(): Exercise { return this.props.exercise; }
}

// ----------------------------------------------------
// AGREGADO RAIZ: WORKOUT
// ----------------------------------------------------

export interface WorkoutProps {
    id: string;
    name: string;
    description: string;
    items: WorkoutItem[];
    // 🚨 Tipado com o Value Object
    focus: WorkoutFocusVO 
}

export class Workout {
    private props: WorkoutProps;

    private constructor(props: WorkoutProps) {
        this.props = props;
    }

    public static createNew(data: Omit<WorkoutProps, 'id'> & { id?: string, focus: WorkoutFocus | WorkoutFocusVO }): Workout {
        const newId = data.id || Math.random().toString(36).substring(2, 9);

        // Garante que a propriedade focus é um VO
        const focusVO = (data.focus as any) instanceof WorkoutFocusVO
            ? data.focus as WorkoutFocusVO
            : WorkoutFocusVO.create(data.focus as WorkoutFocus)

        // Mapeia os dados brutos de itens para a Entidade aninhada WorkoutItem
        const items = data.items.map(item => new WorkoutItem(item as unknown as WorkoutItemProps));

        return new Workout({
            // Passando o focusVO, que é tipado corretamente
            ...data,
            id: newId,
            items: items,
            focus: focusVO,
        } as WorkoutProps)
    }

    // --- Getters da Entidade Principal (Workout) ---
    public getId(): string { return this.props.id; }
    public getName(): string { return this.props.name; }
    public getItems(): WorkoutItem[] { return this.props.items; }
    public getDescription(): string { return this.props.description; }
    public getFocus(): WorkoutFocusVO { return this.props.focus; }
    
    // 🚨 REMOVIDOS: Os getters getOrder(), getSets(), getExercise() pertenciam à WorkoutItem e foram removidos daqui.
    
    public calculateEstimatedDuration(): number {
        // Lógica de negócio do agregado
        return this.props.items.length * 5;
    }
}