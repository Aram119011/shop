
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from "./entities/Admin.entity";
import { CategoriesEntity } from "./entities/Categories.entity";
import { SubcategoriesEntity } from "./entities/Subcategories.entity";
import { ProductsEntity } from "./entities/Products.entites";
import { ProductVariantsEntity } from "./entities/Product-variants.entity";
import { CustomersEntity } from "./entities/Customers.entity";
import { OrdersEntity } from "./entities/Orders.entity";
import { OrderItemsEntity } from "./entities/Order-items.entity";
import { InventoryLogsEntity } from "./entities/Inventory-logs.entity";
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesController } from './subcategories/subcategories.controller';
import { SubcategoriesService } from './subcategories/subcategories.service';
import { SubcategoriesModule } from './subcategories/subcategories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'shopDB',
      entities: [
        AdminEntity,
        CategoriesEntity,
        SubcategoriesEntity,
        ProductsEntity,
        ProductVariantsEntity,
        CustomersEntity,
        OrdersEntity,
        OrderItemsEntity,
        InventoryLogsEntity,
      ],
      synchronize: true,
    }),
    CategoriesModule,
    SubcategoriesModule,
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class AppModule {}
