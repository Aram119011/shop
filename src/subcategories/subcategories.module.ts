
import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesEntity } from '../entities/Subcategories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoriesController } from './subcategories.controller';
import { CategoriesEntity } from '../entities/Categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoriesEntity, CategoriesEntity])],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  exports: [SubcategoriesService],
})
export class SubcategoriesModule {}
