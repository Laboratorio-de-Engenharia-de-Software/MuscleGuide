import { GoalType } from "../../domain/value-objects/goal.vo";

export interface RegisterUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    goalType: GoalType;
}

export interface RegisterUserOutput {
    id: string;
    email: string;
    goalType: GoalType;
}