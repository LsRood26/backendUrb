import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleService } from 'src/role/role.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const role = await this.roleService.findOne(createUserDto.role);
    return this.userService.create(createUserDto, role);
  }

  @UseGuards(AuthGuard)
  @Get()
  getData(@Req() req) {
    return this.userService.getRole(req.user.dni);
  }  

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user
  }

}
