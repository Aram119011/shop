import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from '../dtos/create-subcategories.dto';


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

  //
  // @Delete(':id')
  // async deleteSubcategory(@Param('id') id: number) {
  //   return this.subcategoriesService.deleteSubcategory(id);
  // }

  // @Delete(':id')
  // async deleteSubcategory(@Param('id') id: number) {
  //   return this.subcategoriesService.deleteSubcategory(id);
  // }
}
