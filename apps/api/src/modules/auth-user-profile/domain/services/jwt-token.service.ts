import { Injectable } from "@nestjs/common";
import { ITokenService } from "./token.service";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config/dist/config.service";

const JWT_SECRET = 'SUPER_SECRET_KEY_DEV';
const EXPIRES_IN = '7d';

@Injectable()
export class JwtTokenService implements ITokenService {
    constructor(private configService: ConfigService) { } // Injetar
    public generateToken(userId: string, email: string): string {
        const JWT_SECRET = this.configService.get<string>('JWT_SECRET'); // Lê o valor
        const EXPIRES_IN = '7d';
        const payload = {
            sub: userId,
            emai: email,
        };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN })
    }
}