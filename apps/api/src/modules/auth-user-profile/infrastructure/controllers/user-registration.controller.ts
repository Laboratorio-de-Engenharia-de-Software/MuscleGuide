import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { RegisterUserDto } from '../dtos/register-user.dto';

// ⚠️ Importe o token criado no módulo para injetar o Use Case
// Caso não tenha exportado no .module, use a string 'RegisterUserUseCase'
// para injetar diretamente a classe, já que é um provider.

@Controller('v1/users') // Define a rota base: /v1/users
export class UserRegistrationController {
  constructor(
    // Injetamos o Caso de Uso de Aplicação
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('/register') // Define a rota completa: POST /v1/users/register
  @HttpCode(HttpStatus.CREATED) // Retorna código 201 (Created) em caso de sucesso
  async register(@Body() registerUserDto: RegisterUserDto) {
    
    // O Use Case espera os parâmetros desconstruídos
    const result = await this.registerUserUseCase.execute({
      email: registerUserDto.email,
      password: registerUserDto.password,
      firstName: registerUserDto.firstName,
      lastName: registerUserDto.lastName,
      dateOfBirth: new Date(registerUserDto.dateOfBirth), // Converte a string DTO para Date
      goalType: registerUserDto.goalType,
    });

    // Se o resultado for a Entidade User, retornamos a resposta HTTP (201 Created)
    return {
      message: 'Usuário registrado com sucesso!',
      id: result.id,
      email: result.email,
    };
  }
}