import { Injectable } from '@nestjs/common';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';
import { Compaign } from './entities/compaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaignsService {
  constructor(
    @InjectRepository(Compaign)
    private campaignRepository: Repository<Compaign>,
  ) {}

  create(createCompaignDto: CreateCompaignDto) {
    const newCampaign = this.campaignRepository.create(createCompaignDto);
    return this.campaignRepository.save(newCampaign);
  }

  findAll() {
    return this.campaignRepository.find();
  }

  findOne(id: string) {
    return this.campaignRepository.findOne({ where: { id } }); 
  }

  async update(id: string, updateCompaignDto: UpdateCompaignDto) {
    await this.campaignRepository.update(id, updateCompaignDto);
    return this.campaignRepository.findOne({ where: { id } }); 
  }

  async remove(id: string) {
    await this.campaignRepository.delete(id);
  }
}
