import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsVisitor', async: true })
@Injectable()
export class IsVisitor implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(text: string) {
    const user = await this.userService.getRole(text);
    if (user && user.role.id === 2) {
      return true;
    }
    return false;
  }
}