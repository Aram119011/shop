import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from '../dtos/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
    async login(@Body() loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;
    return this.adminService.login(username, password);
  }
}




// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}
//
//   @Post('login')
//   @HttpCode(HttpStatus.OK) // Set status code for successful login
//   async login(@Body() loginAdminDto: LoginAdminDto) {
//     return this.adminService.login(loginAdminDto.username, loginAdminDto.password);
//   }
// }