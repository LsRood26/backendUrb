import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestService } from './request.service';

@Injectable()
export class RequestOwnerGuard implements CanActivate {
  constructor(
    private readonly requestService: RequestService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    const requestEntity = await this.requestService.findOneByUser(user.dni);

    if (requestEntity) {
      return true;
    }

    throw new UnauthorizedException('User is not authorized to access this request');
  }
}
