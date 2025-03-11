import {AbstractDto} from "@common/dto/abstract.dto";
import {IProduct} from "@modules/product/interfaces/product.interface";
import {ProductCategory, ProductStatus} from "@modules/product/consts/product.const";
import Product from "@modules/product/models/product.model";

export type ProductDtoOptions = Partial<{ isActive?: boolean }>

export class ProductDto extends AbstractDto implements IProduct {
  id?: string;
  name?: string;
  description?: string;
  category?: ProductCategory;
  price?: number;
  stock?: number;
  images?: Array<string>;
  status?: ProductStatus;
  created_at?: Date;
  updated_at?: Date;

  constructor(product: Product, options?: ProductDtoOptions) {
    super(product);
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.stock = product.stock;
    this.images = product.images;
    this.status = product.status;
    this.created_at = product.created_at;
    this.updated_at = product.updated_at;
  }

}
