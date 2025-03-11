import {IsNotEmpty, IsString} from "class-validator";

export class AdminCreateDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string
}
