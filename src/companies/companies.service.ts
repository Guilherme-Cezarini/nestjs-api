import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    const newComapny = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(newComapny);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: string) {
    return this.companyRepository.findOne({where : {id}});
  }

  async update(id: string, updateCompaignDto: UpdateCompanyDto) {
    await this.companyRepository.update(id, updateCompaignDto);
    return this.companyRepository.findOne({ where: { id } }); 
  }

  remove(id: string) {
    return this.companyRepository.delete(id);
  }
}
