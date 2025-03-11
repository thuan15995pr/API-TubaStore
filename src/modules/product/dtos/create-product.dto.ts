import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ProductCategory, ProductStatus} from "@modules/product/consts/product.const";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: ProductCategory;

  @IsNumber()
  @IsNotEmpty()
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
