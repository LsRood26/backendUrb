import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsResident', async: true })
@Injectable()
export class IsResident implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(text: string) {
    const user = await this.userService.getRole(text);

    if (user && user.role.id === 1) {
      return true;
    }
    return false;
  }
}