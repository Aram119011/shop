
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategories'

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  async createSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.createSubcategory(createSubcategoryDto);
  }

  @Get()
  async findAllSubcategory() {
    return this.subcategoriesService.findAllSubcategory();
  }

  @Get(':id')
  async findSubcategoryById(@Param('id') id: number) {
    return this.subcategoriesService.findSubcategoryById(id);
  }
}
