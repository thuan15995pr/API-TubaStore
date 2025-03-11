import {ProductCategory, ProductStatus} from "@modules/product/consts/product.const";

export interface IProduct {
  name?: string;
  description?: string;
  category?: ProductCategory;
  price?: number;
  stock?: number;
  images?: Array<string>;
  status?: ProductStatus;
}
