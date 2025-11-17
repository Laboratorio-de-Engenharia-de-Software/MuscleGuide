import { IUserRepository } from "@app-auth/domain/repositories/user.repository";
import { ITokenService } from "@app-auth/domain/services/token.service";
import { AuthenticateUserInput, AuthenticateUserOutput } from "./authenticate-user.dto";
// import bcrypt from "bcryptjs";

const INVALID_CREDENTIALS_ERROR = new Error('Email ou senha inválidos.');

const bcrypt = require('bcryptjs');

export class AuthenticateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly tokenService: ITokenService,
    ) { }

    public async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user) {
            throw INVALID_CREDENTIALS_ERROR;
        }

        const hash = user.getPasswordHash();
        const isPasswordVaid = await bcrypt.compare(input.password, hash);

        if (!isPasswordVaid) {
            throw INVALID_CREDENTIALS_ERROR
        }

        const acessToken = this.tokenService.generateToken(user.getId(), user.getEmail());

        return {
            acessToken,
            id: user.getId(),
            email: user.getEmail(),
        }
    }
}