import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { RoleType } from '../../../constants';
import { TokenType } from '../../../constants';
import { ApiConfigService } from '@shared/services/api-config.service';
import { AdministratorService } from '../services/admin.service';
import { AdministratorDto } from '@modules/admin/dtos/admin.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    private adminService: AdministratorService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    adminId: string;
    role: RoleType;
    type: TokenType;
  }): Promise<AdministratorDto> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const admin: AdministratorDto = await this.adminService.getById(args.adminId as never);

    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}
