import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompaignsService } from './compaigns.service';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('compaigns')
export class CompaignsController {
  constructor(private readonly compaignsService: CompaignsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCompaignDto: CreateCompaignDto, 
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.compaignsService.create(createCompaignDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.compaignsService.findAll();
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
