// app/api/src/modules/auth-user-profile/infrastructure/persistence/prisma-user.repository.ts

// Importar o cliente Prisma (deve estar configurado no seu Nest.js)
import { PrismaService } from '@shared/prisma/prisma.service';
// Importar o que foi definido na camada de Domínio
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
// Importar o Value Object e o ENUM do Domínio
import { Goal, GoalType } from '../../domain/value-objects/goal.vo';

// 🚨 NOVO: Mapeamento de DOMÍNIO (Português) para PERSISTÊNCIA (Prisma/Inglês)
// Isso traduz o valor do VO (ex: 'GANHO_DE_MASSA') para o nome da chave do ENUM (ex: 'MASS_GAIN')
const GoalTypeMap: Record<GoalType, string> = {
  [GoalType.MASS_GAIN]: 'MASS_GAIN',
  [GoalType.WEIGHT_LOSS]: 'WEIGHT_LOSS',
  [GoalType.MAINTENANCE]: 'MAINTENANCE',
};

const PrismaToDomainMap: Record<string, GoalType> = {
  'MASS_GAIN': GoalType.MASS_GAIN,        // 'MASS_GAIN' -> 'GANHO_DE_MASSA'
  'WEIGHT_LOSS': GoalType.WEIGHT_LOSS,    // 'WEIGHT_LOSS' -> 'PERDA_DE_PESO'
  'MAINTENANCE': GoalType.MAINTENANCE,    // 'MAINTENANCE' -> 'SAIR_DO_SEDENTARISMO'
};

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(model: any): User {
    // Ao ler do DB, mapeamos o valor do DB de volta para o ENUM do Domínio (que está em Português)
    // O Prisma salva 'MASS_GAIN', mas o VO espera 'GANHO_DE_MASSA' (precisaria de um mapa inverso, simplificado aqui)
    const domainGoalValue = PrismaToDomainMap[model.goalType];
    
    const goalVO = Goal.create(domainGoalValue); 
    
    return new (User as any)({
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      dateOfBirth: model.dateOfBirth,
      goal: goalVO,
      createdAt: model.createdAt,
      passwordHash: model.passwordHash, // Certifique-se de passar o hash aqui para o toDomain
    });
  }

  private toPersistence(user: User): any {
    // 1. Obter a string em português do Domínio
    const domainGoalType = user.getGoal().getValue(); 
    
    // 2. 🚨 APLICAÇÃO DO MAPA: Traduzir para o valor que o Prisma espera
    const prismaGoalType = GoalTypeMap[domainGoalType as GoalType];

    return {
      id: user.getId(),
      firstName: user.getFirstName(), 
      lastName: user.getLastName(),
      email: user.getEmail(),
      dateOfBirth: user.getDateOfBirth(), 
      
      // 🚨 CORREÇÃO: Usar o valor traduzido para o Prisma
      goalType: prismaGoalType, 
      
      createdAt: user.getCreatedAt(),
      passwordHash: user.getPasswordHash(),
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.prisma.user.findUnique({ where: { email } });

    if (!userModel) {
      return null;
    }

    return this.toDomain(userModel);
  }

  async save(user: User): Promise<void> {
    const data = this.toPersistence(user);
    
    await this.prisma.user.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}