
import { Controller, Post, Get, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
import { CategoriesEntity } from '../entities/Categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoriesEntity> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Patch(':id')
  patchCategory(@Param('id') id: number, @Body() partialUpdate: Partial<UpdateCategoryDto>) {
    return this.categoriesService.patchCategory(id, partialUpdate);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
