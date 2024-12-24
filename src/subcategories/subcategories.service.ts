import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoriesEntity } from '../entities/Subcategories.entity';
import { CategoriesEntity } from '../entities/Categories.entity';
import { CreateSubcategoryDto } from './dto/create-subcategories';

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
      where: { CategoryID: createSubcategoryDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${createSubcategoryDto.categoryId} not found`,
      );
    }
    const subcategory = this.subcategoriesRepository.create({
      Name: createSubcategoryDto.name,
      Description: createSubcategoryDto.description,
      Category: category,
    });

    return this.subcategoriesRepository.save(subcategory);
  }

  async findAllSubcategory(): Promise<SubcategoriesEntity[]> {
    return this.subcategoriesRepository.find({ relations: ['Category'] });
  }

  async findSubcategoryById(id: number): Promise<SubcategoriesEntity> {
    const subcategory = await this.subcategoriesRepository.findOne({
      where: { SubcategoryID: id },
      relations: ['Category'],
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    return subcategory;
  }
}
