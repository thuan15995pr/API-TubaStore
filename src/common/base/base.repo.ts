import { Model, ModelCtor } from 'sequelize-typescript';
import { QueryOptionDto } from '@common/dto/query-options.dto';
import { PageDto } from '@common/dto/page.dto';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { AbstractDto } from '@common/dto/abstract.dto';
import { AbstractModel } from '@common/abstract.model';
import { CreationAttributes, FindOptions, UpdateOptions } from 'sequelize';

export abstract class BaseRepo<
  DTO extends AbstractDto,
  M extends AbstractModel<DTO>,
> {
  protected constructor(public readonly _model: ModelCtor<M>) {}

  async getAll(queryOptions?: QueryOptionDto): Promise<DTO[]> {
    const result = await this._model.findAll(queryOptions);
    return result.map((item) => item.toDto());
  }

  async getOne(queryOptions?: QueryOptionDto): Promise<DTO> {
    const result = await this._model.findOne(queryOptions);
    return result.toDto();
  }

  async getAllWithPagination(
    queryOptions: QueryOptionDto,
  ): Promise<PageDto<DTO>> {
    const result = await this._model.findAll(queryOptions);
    const resultDto: DTO[] = result.map((item) => item.toDto());
    const pageMeta = new PageMetaDto({
      pageOptionsDto: queryOptions,
      itemCount: result.length,
    });
    return new PageDto<DTO>(resultDto, pageMeta);
  }

  async getById(id: string, queryOptions?: QueryOptionDto): Promise<DTO> {
    const result = await this._model.findByPk(id, queryOptions);
    return result.toDto();
  }

  async create(data: any): Promise<DTO> {
    const result = await this._model.create(data);
    return result.toDto();
  }

  async update(id: string, data: CreationAttributes<M>): Promise<DTO> {
    const result = await this._model.findByPk(id);
    await result.update(data);
    return result.toDto();
  }

  async delete(id: string): Promise<number> {
    return await this._model.destroy({
      where: { id },
    } as FindOptions<M>);
  }
}
