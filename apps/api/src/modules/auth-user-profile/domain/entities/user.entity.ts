import { Goal, GoalType } from "@app-auth/domain/value-objects/goal.vo";

export interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    goal: Goal;
    createdAt: Date;
    passwordHash: string;
}

export class User {

    private props: UserProps;

    private constructor(props: UserProps) {
        if (!props.firstName || !props.email) {
            throw new Error("O usuário deve ter nome e email.");
        }

        this.props = props;
    }

    public static createNew(data: Omit<UserProps, 'id' | 'createdAt'> & { passwordHash: string }): User {
        const newId = Math.random().toString(36).substring(2, 9);
        const goalVO = Goal.create(data.goal.getValue())

        return new User({
            ...data,
            id: newId,
            goal: goalVO,
            createdAt: new Date(),
            // 🚨 CORREÇÃO 2B: Incluir o hash no construtor da Entidade
            passwordHash: data.passwordHash, 
        })
    }

    public updateGoal(newGoalType: GoalType): void {
        this.props.goal = Goal.create(newGoalType);
        console.log(`Usuario ${this.props.id} alterou seu objetivo para ${newGoalType}`)
    }

    public getId(): string { return this.props.id; }

    public getFirstName(): string {
        return this.props.firstName;
    }

    public getLastName(): string | undefined { // se for opcional
        return this.props.lastName;
    }

    public getDateOfBirth(): Date {
        return this.props.dateOfBirth;
    }

    public getEmail(): string { 
        return this.props.email; 
    }

    public getPasswordHash(): string {
        return this.props.passwordHash;
    }

    public getGoal(): Goal { 
        return this.props.goal; 
    }

    public getCreatedAt(): Date { 
        return this.props.createdAt; 
    }
}