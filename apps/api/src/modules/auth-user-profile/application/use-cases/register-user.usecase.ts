import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { RegisterUserInput, RegisterUserOutput } from './register-user.dto';
import { Goal } from '../../domain/value-objects/goal.vo';
import bcrypt from 'bcryptjs';

export class RegisterUserUseCase {
  // Injeção de Dependência (DIP/SOLID): Dependemos APENAS da Interface
  constructor(private readonly userRepository: IUserRepository) { }

  public async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {

    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('O email fornecido já está em uso.');
    }

    const passwordHash = await bcrypt.hash(input.password, 10); // 10 é o salt rounds

    const goalVO = Goal.create(input.goalType);

    const newUser = User.createNew({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      dateOfBirth: input.dateOfBirth,
      goal: goalVO,
      passwordHash: passwordHash,
    });

    await this.userRepository.save(newUser);

    return {
      id: newUser.getId(),
      email: newUser.getEmail(),
      goalType: newUser.getGoal().getValue(),
    };
  }
}