import { BaseRepo } from '@common/base/base.repo';
import { QueryOptionDto } from '@common/dto/query-options.dto';
import { PageDto } from '@common/dto/page.dto';
import { AbstractModel } from '@common/abstract.model';
import { Repository } from 'sequelize-typescript';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { AbstractDto } from '@common/dto/abstract.dto';
import { CreationAttributes } from 'sequelize';
import { WhereOptions } from 'sequelize/types/model';

export abstract class BaseService<
  M extends AbstractModel<DTO, never>,
  DTO extends AbstractDto,
> {
  protected constructor(protected readonly _repository: Repository<M>) {}

  async getMany(queryOptions?: QueryOptionDto): Promise<DTO[] | PageDto<DTO>> {
    let result: M[] = [];
    if (!queryOptions) result = await this._repository.findAll();
    if (!queryOptions.limit || !queryOptions.page) {
      result = await this._repository.findAll(queryOptions);
    }
    if (result.length > 0) return result.map((item) => item.toDto());

    result = await this._repository.findAll(queryOptions);
    const resultDto: DTO[] = result.map((item) => item.toDto());
    const pageMeta = new PageMetaDto({
      pageOptionsDto: queryOptions,
      itemCount: result.length,
    });

    return new PageDto<DTO>(resultDto, pageMeta);
  }

  async getOne(queryOptions?: QueryOptionDto): Promise<DTO> {
    const result: M = await this._repository.findOne(queryOptions);
    return result.toDto();
  }
  async getById(
    id: string,
    queryOptions?: QueryOptionDto,
  ): Promise<DTO | null> {
    const result = await this._repository.findByPk(id, queryOptions);
    return result?.toDto() || null;
  }
  async create(data: any): Promise<DTO> {
    const result = await this._repository.create<M>({
      ...data,
    });
    return result?.toDto();
  }
  async update(id: string, data: Partial<DTO>): Promise<DTO> {
    await this._repository.update(data, { where: { id } as WhereOptions<M> });
    const result = await this._repository.findByPk(id);
    return result.toDto();
  }
  async delete(id: string): Promise<number> {
    return this._repository.destroy({ where: { id } as WhereOptions<M> });
  }
}
