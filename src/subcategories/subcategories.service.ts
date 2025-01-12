
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoriesEntity } from '../entities/Subcategories.entity';
import { CategoriesEntity } from '../entities/Categories.entity';
import { CreateSubcategoryDto } from '../dtos/create-subcategories.dto';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(SubcategoriesEntity)
    private readonly subcategoriesRepository: Repository<SubcategoriesEntity>,

    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async createSubcategory(createSubcategoryDto: CreateSubcategoryDto): Promise<SubcategoriesEntity> {
    const category = await this.categoriesRepository.findOne({
      where: { categoryID: createSubcategoryDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${createSubcategoryDto.categoryId} not found`,
      );
    }
    const subcategory = this.subcategoriesRepository.create({
      name: createSubcategoryDto.name,
      description: createSubcategoryDto.description,
      category,
    });

    return this.subcategoriesRepository.save(subcategory);
  }

  async findAllSubcategory(): Promise<SubcategoriesEntity[]> {
    return this.subcategoriesRepository.find({ relations: ['Category'] });
  }

  async findSubcategoryById(id: number): Promise<SubcategoriesEntity> {
    const subcategory = await this.subcategoriesRepository.findOne({
      where: { subcategoryID: id },
      relations: ['Category'],
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    return subcategory;
  }

  // async deleteSubcategory(id: number): Promise<void> {
  //   const subcategory = await this.subcategoriesRepository.findOne({ where: { SubcategoryID: id } });
  //
  //   if (!subcategory) {
  //     throw new NotFoundException(`Subcategory with ID ${id} not found`);
  //   }
  //
  //   await this.subcategoriesRepository.remove(subcategory);
  // }

  async deleteSubcategory(id: number): Promise<void> {

    const subcategory = await this.subcategoriesRepository.findOne({ where: { subcategoryID: id }});
    if (!subcategory) throw new NotFoundException(`Subcategory with ID ${id} not found`);
    await this.subcategoriesRepository.remove(subcategory);
  }

}
