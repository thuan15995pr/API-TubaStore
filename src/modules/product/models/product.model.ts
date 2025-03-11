import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  UpdatedAt, Validate,
} from 'sequelize-typescript';

import { AbstractModel } from '@common/abstract.model';
import {ProductDto} from "@modules/product/dtos/product.dto";
import {UseDto} from "@decorators/use-dto.decorator";
import {IProduct} from "@modules/product/interfaces/product.interface";
import {ProductCategory, ProductStatus} from "@modules/product/consts/product.const";

@UseDto(ProductDto)
@Table({
  tableName: 'products',
  timestamps: true,
  paranoid: true,
})
export default class Product
  extends AbstractModel<ProductDto>
  implements IProduct
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Default('New Product')
  @Column
  name: string

  @Column(DataType.TEXT)
  description: string

  @AllowNull(false)
  @Column(DataType.STRING)
  category: ProductCategory

  @Default(0)
  @Validate({min: 0 })
  @Column
  price: number

  @Default(1)
  @Validate({min: 0 })
  @Column
  stock: number

  @Column(DataType.ARRAY(DataType.STRING))
  images: Array<string>

  @Default(ProductStatus.ACTIVE)
  @Column
  status: ProductStatus

  @CreatedAt
  @Column
  created_at: Date;
  @UpdatedAt
  @Column
  updated_at: Date;
  @DeletedAt
  @Column
  deleted_at: Date;
}
