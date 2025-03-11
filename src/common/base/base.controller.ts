import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import { Auth, UUIDParam } from '@decorators/http.decorators';
import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { PageDto } from '@common/dto/page.dto';
import { QueryOptionDto } from '@common/dto/query-options.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AbstractDto } from '@common/dto/abstract.dto';
import { CreationAttributes } from 'sequelize';

export class BaseController<
  S extends BaseService<any, DTO>,
  DTO extends AbstractDto,
> {
  constructor(public readonly _service: S) {}
  @Get('')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get list',
    type: PageDto,
  })
  async getList(@Query() queryOptionDto: QueryOptionDto) {
    return await this._service.getMany(queryOptionDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one',
  })
  async getDetail(
    @UUIDParam('id') id: string,
    @Query() queryOptionDto: QueryOptionDto,
  ) {
    return await this._service.getById(id, queryOptionDto);
  }

  @Post()
  // @Auth([RoleType.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create',
  })
  async create(@Body() params: any) {
    return await this._service.create(params as CreationAttributes<any>);
  }

  @Put('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update',
  })
  async update(@UUIDParam('id') id: string, @Body() params: DTO) {
    return await this._service.update(id, params);
  }

  @Delete('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete',
  })
  async delete(@UUIDParam('id') id: string) {
    return await this._service.delete(id);
  }
}
