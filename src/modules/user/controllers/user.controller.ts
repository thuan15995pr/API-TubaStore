import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '@common/dto/page.dto';
import { RoleType } from '@constants/index';
import { ApiPageOkResponse, Auth, UUIDParam } from '@decorators/index';
import { UsersPageOptionsDto } from '../dtos/users-page-options.dto';
import { UserService } from '../services/user.service';
import { BaseController } from '@common/base/base.controller';
import { UserDto } from '@modules/user/dtos/user.dto';
import { QueryOptionDto } from '@common/dto/query-options.dto';

@Controller('users')
@ApiTags('users')
export class UserController extends BaseController<UserService, UserDto> {
  constructor(readonly _service: UserService) {
    super(_service);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get users list',
    type: PageDto,
  })
  async getList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ) {
    return await this._service.getMany(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one',
    type: UserDto,
  })
  async getDetail(
    @UUIDParam('id') id: string,
    @Query() queryOptionDto: QueryOptionDto,
  ) {
    return await this._service.getById(id, queryOptionDto);
  }
}
