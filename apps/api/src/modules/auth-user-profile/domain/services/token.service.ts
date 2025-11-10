export interface ITokenService {
    generateToken(userId: string, email: string): string;
}