import { Injectable } from "@nestjs/common";
import { ITokenService } from "./token.service";
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'SUPER_SECRET_KEY_DEV';
const EXPIRES_IN = '7d';

@Injectable()
export class JwtTokenService implements ITokenService {
    public generateToken(userId: string, email: string): string {
        const payload = {
            sub: userId,
            emai: email,
        };

        return jwt.sign(payload, JWT_SECRET, {expiresIn: EXPIRES_IN})
    }
}