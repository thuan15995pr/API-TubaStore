import { Injectable } from '@nestjs/common';
import type { UsersPageOptionsDto } from '../dtos/users-page-options.dto';
import User from '../models/user.model';
import { FindOptions } from 'sequelize';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { PageDto } from '@common/dto/page.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { BaseService } from '@common/base/base.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService extends BaseService<User, UserDto> {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super(userModel);
  }

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    return await this._repository.create({ ...userRegisterDto });
  }

  // async getMany(
  //   pageOptionsDto: UsersPageOptionsDto,
  // ): Promise<PageDto<UserDto>> {
  //   const options: FindOptions<User> = {
  //     where: {},
  //     limit: 10,
  //     offset: 0,
  //     order: [],
  //     include: [],
  //   };
  //
  //   for (const key in pageOptionsDto) {
  //     if (!pageOptionsDto[key]) {
  //       continue;
  //     }
  //     switch (key) {
  //       case 'order':
  //       case 'page':
  //         break;
  //       case 'limit':
  //         options.limit = pageOptionsDto.limit;
  //         options.offset = (pageOptionsDto.page - 1) * pageOptionsDto.limit;
  //         break;
  //       default:
  //         options.where[key] = pageOptionsDto[key];
  //     }
  //   }
  //
  //   const users = await this._repository.findAll(options);
  //
  //   const pageMeta = new PageMetaDto({
  //     pageOptionsDto: pageOptionsDto,
  //     itemCount: users.length,
  //   });
  //
  //   return new PageDto<UserDto>(users, pageMeta);
  // }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this._repository.findOne({ where: { email } });
  }
}
