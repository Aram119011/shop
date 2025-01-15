
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from '../dtos/create-subcategories.dto';
import { UpdateSubcategoriesDto } from '../dtos/update-subcategories.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('Subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiBody({
    description: 'Data required to create a new subcategory',
    type: CreateSubcategoryDto,
  })
  async createSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.createSubcategory(createSubcategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcategories' })
  async findAllSubcategory() {
    return this.subcategoriesService.findAllSubcategory();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subcategory by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subcategory',
    required: true,
    type: Number,
  })
  async findSubcategoryById(@Param('id') id: number) {
    return this.subcategoriesService.findSubcategoryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subcategory by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subcategory to update',
    required: true,
    type: Number,
  })
  @ApiBody({
    description: 'Data to update the subcategory',
    type: UpdateSubcategoriesDto,
  })
  async updateCategory( @Param('id') id: number, @Body() updateSubcategoriesDto: UpdateSubcategoriesDto,
  ) {
    return this.subcategoriesService.updateSubcategory(id, updateSubcategoriesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcategory by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subcategory to delete',
    required: true,
    type: Number,
  })
  async deleteCategory( @Param('id') id: number, @Body() updateSubcategoriesDto: UpdateSubcategoriesDto,
  ) {
    return this.subcategoriesService.deleteCategory(id);
  }
}
