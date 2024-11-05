import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNotExistUser } from './dto/is.not.user';
import { Role } from 'src/role/entities/role.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, IsNotExistUser],
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [UserService]
})
export class UserModule {}
