
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '../entities/Categories.entity';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categoriesRepository: Repository<CategoriesEntity>,
    ) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoriesEntity> {
        const category = this.categoriesRepository.create({
            Name: createCategoryDto.name,
            Description: createCategoryDto.description,
        });

        return await this.categoriesRepository.save(category);
    }

    async findAllCategories(): Promise<CategoriesEntity[]> {
        return this.categoriesRepository.find();
    }

    async findCategoryById(categoryId: number): Promise<CategoriesEntity> {
        const category = await this.categoriesRepository.findOne({
            where: { CategoryID: categoryId }, relations: ['Subcategories'],
        });

        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
        return category;
    }

    async updateCategory(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoriesEntity> {
        const category = await this.categoriesRepository.preload({
            CategoryID: categoryId,
            ...updateCategoryDto,
        });

        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
        return this.categoriesRepository.save(category);
    }

    async patchCategory(categoryId: number, partialUpdate: Partial<UpdateCategoryDto>): Promise<CategoriesEntity> {
        const category = await this.categoriesRepository.preload({
            CategoryID: categoryId, ...partialUpdate,
        });

        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
        return this.categoriesRepository.save(category);
    }

    async deleteCategory(categoryId: number): Promise<void> {
        const result = await this.categoriesRepository.delete(categoryId);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

    }

}
