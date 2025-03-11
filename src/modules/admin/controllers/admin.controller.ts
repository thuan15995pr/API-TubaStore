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
import { AdministratorsPageOptionsDto } from '../dtos/admin-page-options.dto';
import { AdministratorService } from '../services/admin.service';
import { BaseController } from '@common/base/base.controller';
import { AdministratorDto } from '@modules/admin/dtos/admin.dto';
import { QueryOptionDto } from '@common/dto/query-options.dto';

@Controller('admins')
@ApiTags('admins')
export class AdministratorController extends BaseController<AdministratorService, AdministratorDto> {
  constructor(readonly _service: AdministratorService) {
    super(_service);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get admins list',
    type: PageDto,
  })
  async getList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: AdministratorsPageOptionsDto,
  ) {
    return await this._service.getMany(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one',
    type: AdministratorDto,
  })
  async getDetail(
    @UUIDParam('id') id: string,
    @Query() queryOptionDto: QueryOptionDto,
  ) {
    return await this._service.getById(id, queryOptionDto);
  }
}
