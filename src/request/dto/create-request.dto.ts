import { IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";

import { TransportMode, VisitStatus } from "../entities/request.entity";
import { IsExistUser } from "src/user/dto/is.user";
import { IsResident } from "src/user/dto/is.resident";
import { IsVisitor } from "src/user/dto/is.visitor";


export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsExistUser, { message: 'Resident not exists' })
  @Validate(IsResident, {message: 'User is not a resident' })
  resident: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsExistUser, { message: 'Visitor not exists' })
  @Validate(IsVisitor, {message: 'User is not a visitor'})
  visitor: string;

  @IsString()
  @IsNotEmpty()
  datetime: string;

  @IsOptional()
  photo: string;

  @IsEnum(TransportMode)
  transportMode: TransportMode;
  
  @IsOptional()
  @IsEnum(VisitStatus)
  status: VisitStatus;

  @IsString()
  @IsNotEmpty()
  block: string;

  @IsString()
  @IsNotEmpty()
  villa: string;

}

