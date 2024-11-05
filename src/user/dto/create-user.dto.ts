import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { IsNotExistUser } from "./is.not.user";
import { IsNotExistRole } from "src/role/dto/is.not.role";

export class CreateUserDto {
    @IsString()
  @IsNotEmpty()
  @Validate(IsNotExistUser, { message: 'Dni already exists' })
  dni: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  @Validate(IsNotExistRole, {message: 'Role not exist'})
  role: number;
}
