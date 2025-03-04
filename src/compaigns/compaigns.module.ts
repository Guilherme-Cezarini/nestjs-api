import { Module } from '@nestjs/common';
import { CompaignsService } from './compaigns.service';
import { CompaignsController } from './compaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compaign } from './entities/compaign.entity';
import { UsersModule } from 'src/users/users.module';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compaign]),
    UsersModule
  ],
  controllers: [CompaignsController],
  providers: [CompaignsService, RabbitMQService],
})
export class CompaignsModule {}
