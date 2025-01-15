
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoriesEntity } from '../entities/Subcategories.entity';
import { CategoriesEntity } from '../entities/Categories.entity';
import { CreateSubcategoryDto } from '../dtos/create-subcategories.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { UpdateSubcategoriesDto } from '../dtos/update-subcategories.dto';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(SubcategoriesEntity)
    private readonly subcategoriesRepository: Repository<SubcategoriesEntity>,

    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}


  async createSubcategory(createSubcategoryDto: CreateSubcategoryDto): Promise<SubcategoriesEntity> {

    const { categoryId } = createSubcategoryDto;
    const category = await this.categoriesRepository.findOne({ where: { categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`)
    }

    const subcategory = this.subcategoriesRepository.create({
      name: createSubcategoryDto.name,
      description: createSubcategoryDto.description,
      category,
    });

    return this.subcategoriesRepository.save(subcategory);
  }


  async findAllSubcategory(): Promise<SubcategoriesEntity[]> {
    const subcategories = await this.subcategoriesRepository.find({
      relations: ['category']
    });

    console.log(subcategories, 'Fetched subcategories');
    return subcategories;
  }


  async findSubcategoryById(id: number): Promise<SubcategoriesEntity> {
    const subcategory = await this.subcategoriesRepository.findOne({
      where: { subcategoryId: id }, relations: ['category']
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    return subcategory;
  }


  async updateSubcategory(subCategoryId: number, updateSubcategoriesDto: UpdateSubcategoriesDto ): Promise<SubcategoriesEntity> {

    const subCategory = await this.subcategoriesRepository.findOne({
      where: { subcategoryId: subCategoryId } });
    if (!subCategory) {
      throw new NotFoundException(`Subcategory with ID ${subCategoryId} not found`);
    }

    const updatedSubcategory = this.subcategoriesRepository.merge(subCategory, updateSubcategoriesDto);
    return this.subcategoriesRepository.save(updatedSubcategory);
  }


  async deleteCategory(subCategoryId: number): Promise<{ message: string; result: any }> {

    const result = await this.categoriesRepository.delete(subCategoryId);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${subCategoryId} not found`);
    }

    return {
      message: `Sub categoryId with ID ${subCategoryId} successfully deleted`,
      result,
    }
  }
}
