export interface SetProps {
    series: number;
    repetitions: number;
    restTimeSeconds: number;
}

export class Set {
    private readonly props: SetProps;

    private constructor(props: SetProps) {
        if (props.series <= 0 || props.repetitions <= 0) {
            throw new Error("Series e repetições devem ser maiores que zero")
        }
        this.props = props;
    }

    public static create(props: SetProps): Set {
        return new Set(props)
    }

    public getSeries(): number {return this.props.series}
    public getRepetitions(): number {return this.props.repetitions}
    public getRestTimeSeconds(): number {return this.props.restTimeSeconds}

    public toPrimitives(): SetProps {
        return this.props;
    }

    public isQuickRest(): boolean {
        return this.props.restTimeSeconds < 30
    }
}