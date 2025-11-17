import { ExerciseMuscleGroup, MuscleGroup } from "../value-objects/exercise-muscle-group.vo";

export interface ExerciseProps {
    id: string;
    name: string;
    targetGroups: ExerciseMuscleGroup[];
    gifUrl: string;
    isBasic: boolean;
}

export class Exercise {
    private props: ExerciseProps;
    private constructor(props: ExerciseProps) {
        this.props = props;
    }

    public static createNew(data: Omit<ExerciseProps, 'id'> & {id?: string}): Exercise {
        const newId = data.id || Math.random().toString(36).substring(2, 9);

        const groups = data.targetGroups.map(g => {
            return g instanceof ExerciseMuscleGroup ? g : ExerciseMuscleGroup.create(g as MuscleGroup)
        });

        return new Exercise({
            ...data,
            id: newId,
            targetGroups: groups
        })
    }

    public getId(): string { return this.props.id; }
    public getName(): string { return this.props.name; }
    public getGifUrl(): string { return this.props.gifUrl; }
    public getTargetGroups(): ExerciseMuscleGroup[] { return this.props.targetGroups; }
    public isBasic(): boolean { return this.props.isBasic; }
    
    public canBeSubstituted(): boolean {
        return !this.props.isBasic;
    }
}