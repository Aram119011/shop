import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesEntity } from '../entities/Categories.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriesEntity])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService], // Export if needed in other modules
})
export class CategoriesModule {}
