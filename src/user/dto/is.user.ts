import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsExistUser', async: true })
@Injectable()
export class IsExistUser implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(text: string) {
    return Boolean(await this.userService.findOne(text));
  }
}