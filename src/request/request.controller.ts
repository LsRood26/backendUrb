import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { VisitStatus } from './entities/request.entity';
import { RequestOwnerGuard } from './request.owner.guard';
import { UserService } from 'src/user/user.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService, private readonly userService: UserService) {}

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req, @Body() payload: CreateRequestDto) {
    const {resident, visitor} = payload;
    const aux_resident = await this.userService.findOne(resident);
    const aux_visitor = await this.userService.findOne(visitor);
    const user = await this.userService.getRole(req.user.dni);
    
    if (user.role.id == 1) {
      payload.status = VisitStatus.ACCEPTED  
    } else {
      payload.status = VisitStatus.PENDING
    }

    return this.requestService.create(payload, aux_resident, aux_visitor);
  }

  @UseGuards(AuthGuard)
  @Get('user-requests')
  findAll(@Req() req) {
    const {dni} = req?.user;
    return this.requestService.findAllByUser(dni);
  }

  @UseGuards(AuthGuard, RequestOwnerGuard)
  @Patch()
  update(@Body() updateRequestDto: UpdateRequestDto) {
  const status = Boolean(updateRequestDto.status);
    return this.requestService.update(status, updateRequestDto);
  }

  @UseGuards(AuthGuard, RequestOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
