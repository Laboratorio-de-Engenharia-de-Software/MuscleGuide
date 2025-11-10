export interface AuthenticateUserInput {
    email: string;
    password: string;
}

export interface AuthenticateUserOutput {
    acessToken: string;
    id: string;
    email: string;
}