import { AuthenticateUserUseCase } from "@app-auth/application/use-cases/authenticate-user.usecase";
import { LoginUserDto } from "../dtos/login-user.dto";
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AUTHENTICATE_USE_CASE_TOKEN } from "@app-auth/auth-user-profile.module";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

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

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return {
            message: 'Acesso Autorizado! Esta rota está protegida.',
            user: req.user,
        }
    }
}