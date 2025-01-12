
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin_username', description: 'Admin username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  @IsString()
  password: string;
}
