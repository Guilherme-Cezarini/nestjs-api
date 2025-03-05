import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';
import { Compaign } from './entities/compaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RabbitMQService } from './rabbitmq.service';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';


@Injectable()
export class CompaignsService {
  constructor(
    @InjectRepository(Compaign)
    private campaignRepository: Repository<Compaign>,
    private readonly rabbitMQService: RabbitMQService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(
    createCompaignDto: CreateCompaignDto,
    file: Express.Multer.File,
    request: Request
  ) {
    if(!file) {
      throw new BadRequestException('file is required');
    }
    
    const userId = request.user!['sub'];
    const user = await this.userRepository.findOne({ where: { id: userId }});
    
    const newCampaign = this.campaignRepository.create({
      ...createCompaignDto, 
      company_id: user?.company_id,
    });
    const campaign = await this.campaignRepository.save(newCampaign);
    const filePath = file.path;
  
    await this.rabbitMQService.processFileAndSendToQueue(filePath, process.env.RABBITMQ_QUEUE || "", campaign);
    return campaign;
  }
  
  async paginate(options: IPaginationOptions): Promise<Pagination<Compaign>> {
    return paginate<Compaign>(this.campaignRepository, options);
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
