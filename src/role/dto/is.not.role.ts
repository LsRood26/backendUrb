import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RoleService } from '../role.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsNotExistRole', async: true })
@Injectable()
export class IsNotExistRole implements ValidatorConstraintInterface {
  constructor(private readonly roleService: RoleService) {}
  async validate(id: number) {
    const aux = Boolean(await this.roleService.findOne(id));
    return aux
  }
}