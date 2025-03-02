import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { CompaignsModule } from './compaigns/compaigns.module';
import { IdGeneratorService } from './id-generator/id-generator.service';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Compaign } from './compaigns/entities/compaign.entity';
import { Company } from './companies/entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type:     'postgres',
        host:     configService.get<string>('POSTGRE_DB_HOST', ""),
        port:     configService.get<number>('POSTGRE_DB_PORT', 5432),
        username: configService.get<string>('POSTGRE_DB_USERNAME', ""),
        password: configService.get<string>('POSTGRE_DB_PASSWORD', ""),
        database: configService.get<string>('POSTGRE_DB_DATABASE', ""),
        entities: [User, Compaign, Company],
        synchronize: true, 
      })
    }),
    CompaniesModule,
    UsersModule,
    CompaignsModule,
  ],
  controllers: [AppController],
  providers: [AppService, IdGeneratorService],
})
export class AppModule {}
