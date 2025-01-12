
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
        const category = await this.categoriesRepository.findOne({ where: { categoryID: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
        return category;
    }

    //toDo
    async updateCategory(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoriesEntity> {
        console.log(categoryId, 'sadasd');
        const category = await this.categoriesRepository.preload({
            categoryID: categoryId, ...updateCategoryDto,
        });
        console.log(category, 'sadsdd');

        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
        return this.categoriesRepository.save(category);
    }

                    // async updateCategory(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoriesEntity> {
                    //     console.log('Category ID:', categoryId);
                    //     console.log('Update Data:', updateCategoryDto);
                    //
                    //     const category = await this.categoriesRepository.preload({
                    //         categoryID: categoryId, ...updateCategoryDto,
                    //     });
                    //     console.log(category, '+++adasd');
                    //
                    //     if (!category) {
                    //         console.error(`Category with ID ${categoryId} not found`);
                    //         throw new NotFoundException(`Category with ID ${categoryId} not found`);
                    //     }
                    //
                    //     console.log('Updated Category:', category);
                    //     return this.categoriesRepository.save(category);
                    // }


    async deleteCategory(categoryId: number): Promise<void> {
        const result = await this.categoriesRepository.delete(categoryId);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

    }

}
