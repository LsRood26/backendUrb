import { Module } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeeder],
  exports: [RoleSeeder],
})
export class SeederModule {}