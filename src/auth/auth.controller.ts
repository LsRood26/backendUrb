import { Controller, Post, Body, Request, UnauthorizedException, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() body){
        const {dni, password} = body;

        if (!dni || !password) {
           throw new HttpException('Faltan Credenciales', HttpStatus.BAD_REQUEST); 
        }

        const user = await this.authService.validateUser(dni, password);

        if (!user) {
            throw new HttpException('Credenciales invalidas', HttpStatus.UNAUTHORIZED);
        }

        const access_token = await this.authService.login(user);
        return {...user, access_token}
    }

    @HttpCode(201)
    @Post('register')
    async register(@Body() body: CreateUserDto){
        const response = this.authService.register(body)
        return response;
    }
}
