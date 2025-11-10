import { AuthenticateUserUseCase } from "@app-auth/application/use-cases/authenticate-user.usecase";
import { LoginUserDto } from "../dtos/login-user.dto";
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { AUTHENTICATE_USE_CASE_TOKEN } from "@app-auth/auth-user-profile.module";

@Controller('v1/auth')
export class AuthenticationController {
    constructor(
        // @Inject(AUTHENTICATE_USE_CASE_TOKEN)
        private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
        const output = await this.authenticateUserUseCase.execute({
            email: loginUserDto.email,
            password: loginUserDto.password,
        })

        return output;
    }
}