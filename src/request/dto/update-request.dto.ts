import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { IsNumber } from 'class-validator';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
    @IsNumber()
    id:number
}
