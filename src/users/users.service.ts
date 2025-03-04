import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../companies/entities/company.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';


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

    try {
      
      newUser.company = company;
      const user = await this.userRepository.save(newUser);
      return plainToInstance( User, user)
    } catch(error) {
    
      if (error.code == '23505') {
        
        throw new BadRequestException('Email already exists');
        
      }
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    const paginte = await paginate<User>(this.userRepository, options);
    const items = plainToInstance(User, paginte.items);

    return {
      ...paginte,
      items,
    };
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } }); 
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const company = await this.companyRepository.findOne({ where: { id: updateUserDto.company_id }})
    if (!company){ 
      throw new BadRequestException('Company not found');
    }

    if (updateUserDto.password !== "") {
      
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      const newUser = this.userRepository.create({
        ...updateUserDto, 
        password: hashedPassword,
      });
      await this.userRepository.update(id, newUser);
      const user = await this.userRepository.findOne({ where: { id } }); 
      return plainToInstance(User, user);
    }

    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOne({ where: { id } }); 
    return plainToInstance(User, user);
 
  }

  async remove(id: string) { 
  
    await this.userRepository.delete(id);

  }
}
