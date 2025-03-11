import type { AbstractModel } from '../abstract.model';
import { MakeNullishOptional } from 'sequelize/types/utils';

export class AbstractDto implements MakeNullishOptional<AbstractModel> {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  constructor(model: AbstractModel, options?: { excludeFields?: boolean }) {
    this.id = model.id;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
    if (options?.excludeFields) {
      delete this.id;
      delete this.created_at;
      delete this.updated_at;
    }
  }
}
