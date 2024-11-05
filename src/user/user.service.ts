import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async findOne(dni: string) {
    const user = await this.userRepository.findOne({where: {dni}});
    return user;
  }

  async getRole(dni: string){
    const user = await this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role') 
    .select(['user.dni', 'user.name', 'user.lastname', 'role.id', 'role.name']) // Selecciona las columnas que deseas
    .where('user.dni = :dni', { dni })
    .getOne();
    return user;
  }
  async create(createUserDto: CreateUserDto, role: Role) {
    return await this.userRepository.insert({
      dni: createUserDto.dni,
      lastname: createUserDto.lastname,
      name: createUserDto.name,
      password: createUserDto.password,
      role: role,
    })
  }

}
