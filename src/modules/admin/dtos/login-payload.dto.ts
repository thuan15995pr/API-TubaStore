import { ApiProperty } from '@nestjs/swagger';

import { TokenPayloadDto } from './token-payload.dto';
import { AdministratorDto } from '@modules/admin/dtos/admin.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: AdministratorDto })
  admin: AdministratorDto;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(admin: AdministratorDto, token: TokenPayloadDto) {
    this.admin = admin;
    this.token = token;
  }
}
