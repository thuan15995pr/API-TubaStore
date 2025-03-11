import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { RoleType } from '../../../constants';
import { TokenType } from '../../../constants';
import { UserNotFoundException } from '../../../exceptions';
import { ApiConfigService } from '@shared/services/api-config.service';
import type User from '../models/user.model';
import { UserService } from './user.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import type { UserLoginDto } from '../dtos/user-login.dto';
import { validateHash } from '@common/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  createAccessToken(data: { role: RoleType; userId: string }): TokenPayloadDto {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: this.jwtService.sign({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userLoginDto.email);
    if (!user) throw new UserNotFoundException();
    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
