import { Module } from '@nestjs/common';
import { CompaignsService } from './compaigns.service';
import { CompaignsController } from './compaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compaign } from './entities/compaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compaign])],
  controllers: [CompaignsController],
  providers: [CompaignsService],
})
export class CompaignsModule {}
