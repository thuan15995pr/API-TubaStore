import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, Version,} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {RoleType} from '../../../constants';
import {Auth, AuthUser} from '../../../decorators';
import Administrator from '../models/admin.model';
import {AdministratorService} from '../services/admin.service';
import {AuthService} from '../services/auth.service';
import {LoginPayloadDto} from '../dtos/login-payload.dto';
import {AdministratorLoginDto} from '../dtos/admin-login.dto';
import {FilesService} from '@shared/services/files.service';
import {AdministratorDto} from '@modules/admin/dtos/admin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private adminService: AdministratorService,
    private authService: AuthService,
    private filesService: FilesService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'Administrator info with access token',
  })
  async adminLogin(
    @Body() adminLoginDto: AdministratorLoginDto,
  ): Promise<LoginPayloadDto> {
    const admin = await this.authService.validateAdministrator(adminLoginDto);

    const token = this.authService.createAccessToken({
      adminId: admin.id,
      role: RoleType.ADMIN,
    });

    return new LoginPayloadDto(admin.toDto(), token);
  }
  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: Administrator, description: 'current admin info' })
  getCurrentAdministrator(@AuthUser() admin: AdministratorDto, @Res() res) {
    return res.status(HttpStatus.OK).send({data: admin});
  }
}
