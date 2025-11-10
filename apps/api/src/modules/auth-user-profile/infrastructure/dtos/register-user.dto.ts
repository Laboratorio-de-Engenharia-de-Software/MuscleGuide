import { GoalType } from '@app-auth/domain/value-objects/goal.vo';
import { IsEmail, IsNotEmpty, IsString, IsDateString, IsEnum, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    firstName!: string

    @IsString()
    @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
    lastName!: string;

    @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório. ' })
    email!: string

    @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida.' })
    dateOfBirth!: string; // Nest.js recebe como string, o Use Case fará a conversão para Date

    @IsString()
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    password!: string;

    @IsEnum(GoalType, { message: 'O tipo de objetivo (goalType) é inválido.' })
    goalType!: GoalType;
}