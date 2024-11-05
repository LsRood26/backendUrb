import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { IsNotExistRole } from './dto/is.not.role';

@Module({
  controllers: [RoleController],
  providers: [RoleService, IsNotExistRole],
  imports:[TypeOrmModule.forFeature([Role])],
  exports: [RoleService]
})
export class RoleModule {}
