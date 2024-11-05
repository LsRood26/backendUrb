import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from './entities/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestService: Repository<RequestEntity>,
  ) {}
  async create(createRequestDto: CreateRequestDto, resident, visitor) {
    return await this.requestService.insert({
      ...createRequestDto,
      resident,
      visitor
    });
  }

  findAll() {
    return `This action returns all request`;
  }

  async findAllByUser(dni: string) {
    return await this.requestService
  .createQueryBuilder('request_entity')
  .select([
    'request_entity.id',
    'request_entity.datetime',
    'request_entity.photo',
    'request_entity.status',
    'request_entity.transportMode',
    'request_entity.block',
    'request_entity.villa',
    'resident.dni',
    'visitor.dni',
    'visitor.name',
    'visitor.lastname',
  ])
  .innerJoin('request_entity.resident', 'resident')
  .innerJoin('request_entity.visitor', 'visitor')
  .where('request_entity.visitorDni = :visitorDni', { visitorDni: dni })
  .orWhere('request_entity.residentDni = :residentDni', { residentDni: dni })
  .getRawMany();
  }

  findOneByUser(dni: number) {
    return this.requestService
    .createQueryBuilder('request_entity')
    .select('request_entity.id')
    .innerJoin('request_entity.resident', 'resident')
    .innerJoin('request_entity.visitor', 'visitor')
    .where('request_entity.visitorDni = :visitorDni', { visitorDni: dni })
    .orWhere('request_entity.residentDni = :residentDni', { residentDni: dni })
    .getRawOne();
  }

  update(status: boolean, updateRequestDto: UpdateRequestDto) {
    if (status) {
      return this.requestService.update({id:updateRequestDto.id},{status:updateRequestDto.status})
    } else{
      return this.requestService.update({id:updateRequestDto.id},{datetime:updateRequestDto.datetime, transportMode: updateRequestDto.transportMode, block: updateRequestDto.block, villa: updateRequestDto.villa})
    }
  }

  remove(id: number) {
    return this.requestService.delete({id});
  }
}
