
import { IsString, IsOptional } from 'class-validator';

export class UpdateSubcategoriesDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
