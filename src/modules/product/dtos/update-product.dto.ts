import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {ProductCategory, ProductStatus} from "@modules/product/consts/product.const";

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: ProductCategory;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsArray()
  @IsOptional()
  images?: Array<string>;

  @IsString()
  @IsOptional()
  status?: ProductStatus;
}
