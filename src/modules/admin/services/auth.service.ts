import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { RoleType } from '../../../constants';
import { TokenType } from '../../../constants';
import { AdminNotFoundException } from '../../../exceptions';
import { ApiConfigService } from '@shared/services/api-config.service';
import type Administrator from '../models/admin.model';
import { AdministratorService } from './admin.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import type { AdministratorLoginDto } from '../dtos/admin-login.dto';
import { validateHash } from '@common/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private adminService: AdministratorService,
  ) {}

  createAccessToken(data: { role: RoleType; adminId: string }): TokenPayloadDto {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: this.jwtService.sign({
        adminId: data.adminId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateAdministrator(adminLoginDto: AdministratorLoginDto): Promise<Administrator> {
    const admin = await this.adminService.getAdministratorByEmail(adminLoginDto.email);
    if (!admin) throw new AdminNotFoundException();
    const isPasswordValid = await validateHash(
      adminLoginDto.password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new AdminNotFoundException();
    }

    return admin;
  }
}
