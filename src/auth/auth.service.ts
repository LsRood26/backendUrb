import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    /* async validateUser(dni: number, password:string){
        const user = await this.userService.findOne(dni);
        if(user && (await bcrypt.compare(password, user.password))){
            console.log('contrasenia valida')
            const { password, ...result} = user;
            return result;
        }
        return null;
    } */

    async validateUser(dni: number, password:string){
        const user = await this.userService.findOne(dni);
        /* if(user && (await bcrypt.compare(password, user.password)) ){
            console.log('contrasenia valida')
            const { password, ...result} = user;
            return result;
        }
        return null; */
        if (!user){
            return null;
        }

        if(user.password == password){
            const{ password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user){
        const payload = { dni:user.dni, sub: user.id};
        return {
            acces_token: this.jwtService.sign(payload)
        }
    }
}
