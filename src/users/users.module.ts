import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./entities/user.entity";
import { CompaniesModule } from '../companies/companies.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([User]), CompaniesModule], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
