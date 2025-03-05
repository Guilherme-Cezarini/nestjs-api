import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards, UploadedFile, UseInterceptors, Req, Query, BadRequestException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompaignsService } from './compaigns.service';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';


@Controller('compaigns')
export class CompaignsController {
  constructor(
    private readonly compaignsService: CompaignsService,
  
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      
      destination: './uploads',
      filename: (req, file, callback) => {
    
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  }))
  async create(
    @Body() createCompaignDto: CreateCompaignDto, 
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    
    return this.compaignsService.create(createCompaignDto, file, req);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.compaignsService.paginate(options);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.compaignsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCompaignDto: UpdateCompaignDto) {
    return this.compaignsService.update(id, updateCompaignDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.compaignsService.remove(id);
  }
}
