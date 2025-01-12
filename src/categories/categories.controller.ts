
import { Controller, Post, Get, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoriesEntity } from '../entities/Categories.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoriesEntity> {
    return this.categoriesService.createCategory(createCategoryDto);
  }


  @Get()
  @ApiOperation({ summary: 'Get a category by ID' })
  async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiParam({ name: 'id', description: 'The ID of the category' })
  async findCategoryById(@Param('id') id: number) {
    return this.categoriesService.findCategoryById(id);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Get a category by ID' })
  // @ApiParam({ name: 'id', description: 'The ID of the category to update' })
  // updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.updateCategory(id, updateCategoryDto);
  // }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' }) // Corrected summary
  @ApiParam({ name: 'id', description: 'The ID of the category to update' })
  async updateCategory( @Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  // @Patch(':id')
  // patchCategory(@Param('id') id: number, @Body() partialUpdate: Partial<UpdateCategoryDto>) {
  //   return this.categoriesService.patchCategory(id, partialUpdate);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the category to delete' })
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
