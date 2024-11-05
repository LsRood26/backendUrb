import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    await this.createRoleWithFixedId(1, 'Resident');
    await this.createRoleWithFixedId(2, 'Visitor');
  }

  private async createRoleWithFixedId(id: number, name: string) {
    const existingRole = await this.roleRepository.findOne({ where: { id } });
    if (!existingRole) {
      const role = this.roleRepository.create({ id, name });
      await this.roleRepository.save(role);
      console.log(`Role "${name}" created with ID ${id}.`);
    } else {
      console.log(`Role "${name}" with ID ${id} already exists.`);
    }
  }
}