
import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoriesEntity } from '../entities/Categories.entity';
import { ApiOperation, ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({
    description: 'Data required to create a new category',
    type: CreateCategoryDto,
  })
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoriesEntity> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category',
    required: true,
    type: Number,
  })
  async findCategoryById(@Param('id') id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category to update',
    required: true,
    type: Number,
  })
  @ApiBody({
    description: 'Data to update the category',
    type: UpdateCategoryDto,
  })
  async updateCategory( @Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category to delete',
    required: true,
    type: Number,
  })
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
