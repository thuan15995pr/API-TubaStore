import {Module} from "@nestjs/common";
import Product from "@modules/product/models/product.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {ProductController} from "@modules/product/controllers/product.controller";
import {ProductService} from "@modules/product/services/product.service";

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  exports: [ProductService],
  providers: [ProductService],
})
export class ProductModule {}
