
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '../entities/Categories.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categoriesRepository: Repository<CategoriesEntity>,
    ) {}


    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoriesEntity> {

        const category = this.categoriesRepository.create({
            name: createCategoryDto.name,
            description: createCategoryDto.description,
        });

        return await this.categoriesRepository.save(category);
    }


    async findAllCategories(): Promise<CategoriesEntity[]> {

        return this.categoriesRepository.find();
    }


    async findCategoryById(categoryId: number): Promise<CategoriesEntity> {

        const category = await this.categoriesRepository.findOne({ where: { categoryId } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        return category;
    }


    async updateCategory(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoriesEntity> {

        const category = await this.categoriesRepository.findOne({ where: { categoryId } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`)
        }

        const updatedCategory = this.categoriesRepository.merge(category, updateCategoryDto);
        console.log(updatedCategory, 'Updated category');
        return this.categoriesRepository.save(updatedCategory);
    }


    async deleteCategory(categoryId: number): Promise<{ message: string; result: any }> {

        const result = await this.categoriesRepository.delete(categoryId);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`)
        }
        return {
            message: `Category with ID ${categoryId} successfully deleted`,
            result
        }
    }
}
