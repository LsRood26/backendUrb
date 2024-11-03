import { Controller, Post, Body, Request, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

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

        return this.authService.login(user);
    }

    /* @Post('login')
    async login(@Body()loginDto: {dni: number; password: string}){
        const user = await this.authService.validateUser(
            loginDto.dni,
            loginDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas');
        }
        return this.authService.login(user);
    } */
   /* @Post('login')
   async login(@Request() req){
    const { dni, password} = req.body;
    const user = await this.authService.validateUser(dni, password);
    if(!user){
        return {message: 'Credenciales invalidas'}
    }
    return this.authService.login(user);
   } */
}
