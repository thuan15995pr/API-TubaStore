import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {BaseController} from "@common/base/base.controller";
import {ProductService} from "@modules/product/services/product.service";
import {ProductDto} from "@modules/product/dtos/product.dto";
import {Auth, UUIDParam} from "@decorators/http.decorators";
import {RoleType} from "@constants/role-type";
import {ApiPageOkResponse} from "@decorators/api-page-ok-response.decorator";
import {PageDto} from "@common/dto/page.dto";
import {QueryOptionDto} from "@common/dto/query-options.dto";
import {CreationAttributes} from "sequelize";
import {CreateProductDto} from "@modules/product/dtos/create-product.dto";

@Controller('product')
@ApiTags('product')
export class ProductController extends BaseController<ProductService, ProductDto> {
  constructor(
    readonly _service: ProductService
  ) {
    super(_service);
  }

  @Get()
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
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Get one',
  })
  async getDetail(
    @UUIDParam('id') id: string,
    @Query() queryOptionDto: QueryOptionDto,
  ) {
    const result = await this._service.getById(id, queryOptionDto);
    return result;
  }

  @Post()
  @Auth([RoleType.USER], { public: true })
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Create',
  })
  async create(@Body() params: CreateProductDto) {
    console.log('PARAM ======>', params);
    return await this._service.create(params);
  }

  @Put('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Update',
  })
  async update(@UUIDParam('id') id: string, @Body() params: ProductDto) {
    return await this._service.update(id, params);
  }

  @Delete('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Delete',
  })
  async delete(@UUIDParam('id') id: string) {
    return await this._service.delete(id);
  }

}
