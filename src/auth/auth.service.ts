import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService
    ){}

    

    async validateUser(dni: string, password:string){
        const user = await this.userService.findOne(dni);
        if(user && (await bcrypt.compare(password, user.password)) ){
            return await this.userService.getRole(dni)
        }
        
        return null;
        
    }

    async login(user){
        const payload = { dni:user.dni, sub: user.id};
        return this.jwtService.sign(payload)
    }

    async register(user: CreateUserDto){
        const {dni, password, name, lastname, role} = user;
        const encrypted_password = await bcrypt.hash(password, 10)
        const roleE = await this.roleService.findOne(role)
        if(!roleE) return false;
        const created = await this.userService.create({dni, password: encrypted_password, name, lastname, role}, roleE)

        return created.identifiers;
    }
}
