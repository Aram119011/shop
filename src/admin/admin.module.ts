
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/Admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
      TypeOrmModule.forFeature([AdminEntity]),
      JwtModule.register({
        secret: 'yourSecretKey', // Replace with your actual secret key
        signOptions: { expiresIn: '1h' },
      }),
    ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})

export class AdminModule {}
