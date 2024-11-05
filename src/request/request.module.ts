import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './entities/request.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [RequestController],
  providers: [RequestService, UserService],
  imports: [TypeOrmModule.forFeature([RequestEntity, User])],
})
export class RequestModule {}
