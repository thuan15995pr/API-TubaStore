import { Allow, IsBoolean, IsOptional, IsString } from 'class-validator';
import {
  FindOptions,
  Includeable,
  OrderItem,
  WhereOptions,
} from 'sequelize/types/model';
import { Col, Fn, Literal } from 'sequelize/types/utils';
import {
  EnumFieldOptional,
  NumberFieldOptional,
} from '@decorators/field.decorators';
import { Order } from '@constants/order';
import { Transaction } from 'sequelize';

export class QueryOptionDto implements FindOptions {
  @IsOptional()
  where?: WhereOptions = {};

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  limit?: number = 10;

  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page?: number = 1;

  @IsOptional()
  get offset(): number {
    return (this.page - 1) * this.limit;
  }

  // TODO Bugs on Order
  @EnumFieldOptional(() => Order, {
    default: [['createdAt', 'DESC']],
  })
  readonly order?: Fn | Col | Literal | OrderItem[];

  @IsOptional()
  attributes?: string[];

  @IsOptional()
  include?: Includeable | Includeable[];

  @IsBoolean()
  @IsOptional()
  distinct?: boolean;

  @IsBoolean()
  @IsOptional()
  paranoid?: boolean;

  @IsOptional()
  transaction?: Transaction;

  [key: string]: any;
}
