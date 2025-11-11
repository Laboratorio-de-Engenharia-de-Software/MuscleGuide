import { Module, Provider } from '@nestjs/common';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { IUserRepository } from './domain/repositories/user.repository';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { UserRegistrationController } from './infrastructure/controllers/user-registration.controller';

// 🚨 NOVO: Importar o seu PrismaService de shared/
import { PrismaService } from '@shared/prisma/prisma.service'; 
import { ITokenService } from './domain/services/token.service';
import { AuthenticationController } from './infrastructure/controllers/authentication.controller';
import { JwtTokenService } from './domain/services/jwt-token.service';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.usecase';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { JwtStrategy } from './infrastructure/guards/jwt.strategy';
// Importar o PrismaClient puro não é necessário se usarmos o PrismaService

export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository');
export const AUTHENTICATE_USE_CASE_TOKEN = Symbol('AuthenticateUserUseCase')
export const TOKEN_SERVICE_TOKEN = Symbol('ITokenService')

const TokenProviders: Provider[] = [
  {
    provide: TOKEN_SERVICE_TOKEN,
    useClass: JwtTokenService,
  }
]

const ControllerAuthenticationProvider: Provider = {
  // Prover a CLASSE (token para o Controller)
  provide: AuthenticateUserUseCase, 
  // Injetar o Use Case que foi construído pelo Símbolo
  useExisting: AUTHENTICATE_USE_CASE_TOKEN, 
};

const AuthenticationProviders: Provider[] = [
  {
    provide: AUTHENTICATE_USE_CASE_TOKEN,
    useFactory: (userRepo: IUserRepository, tokenService: ITokenService) => 
      new AuthenticateUserUseCase(userRepo, tokenService),
    inject: [USER_REPOSITORY_TOKEN, JwtTokenService]
  }
]

const InfrastructureProviders: Provider[] = [
  {
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
    inject: [PrismaService], 
  },
];

const ApplicationProviders: Provider[] = [
  {
    provide: RegisterUserUseCase,
    useFactory: (repository: IUserRepository) => new RegisterUserUseCase(repository),
    inject: [USER_REPOSITORY_TOKEN], 
  },
];

@Module({
  // 🚨 CORREÇÃO CRUCIAL: Importar o módulo que fornece o PrismaService!
  imports: [PrismaModule], 
  controllers: [UserRegistrationController, AuthenticationController],
  providers: [
    ...InfrastructureProviders,
    ...ApplicationProviders,
    ...TokenProviders,
    ...AuthenticationProviders,
    JwtTokenService,
    ControllerAuthenticationProvider,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [
    RegisterUserUseCase,
    AUTHENTICATE_USE_CASE_TOKEN,
    JwtAuthGuard,
  ],
})
export class AuthUserProfileModule {}