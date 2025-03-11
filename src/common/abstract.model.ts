import type { AbstractDto } from './dto/abstract.dto';
import { Constructor } from '../types';
import { Model } from 'sequelize-typescript';

export interface IAbstractModel<DTO extends AbstractDto, O = never> {
  toDto(options?: O): DTO;
}

export abstract class AbstractModel<
    DTO extends AbstractDto = AbstractDto,
    O = never,
  >
  extends Model
  implements IAbstractModel<DTO, O>
{
  id!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
  private dtoClass?: Constructor<DTO, [AbstractModel, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;
    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }
    return new dtoClass(this, options);
  }
}
