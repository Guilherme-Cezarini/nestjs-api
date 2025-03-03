import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../companies/entities/company.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const company = await this.companyRepository.findOne({ where: { id: createUserDto.company_id }})
    if (!company){ 
      throw new BadRequestException('Company not found');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto, 
      password: hashedPassword,
    });
    newUser.company = company;
    return this.userRepository.save(newUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } }); 
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const company = await this.companyRepository.findOne({ where: { id: updateUserDto.company_id }})
    if (!company){ 
      throw new BadRequestException('Company not found');
    }
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } }); 
 
  }

  async remove(id: string) { 
    await this.userRepository.delete(id);
  }
}
