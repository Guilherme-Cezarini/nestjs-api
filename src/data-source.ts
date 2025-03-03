import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Company } from './companies/entities/company.entity';
import { Compaign } from './compaigns/entities/compaign.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';

const configService = new ConfigService();

ConfigModule.forRoot({
  isGlobal: true
});

export const AppDataSource = new DataSource({
  type: 'postgres',
 
  host: configService.get<string>('POSTGRE_DB_HOST', ''),
  port: configService.get<number>('POSTGRE_DB_PORT', 5543),
  username: configService.get<string>('POSTGRE_DB_USERNAME', ''),
  password: configService.get<string>('POSTGRE_DB_PASSWORD', ''),
  database: configService.get<string>('POSTGRE_DB_DATABASE', ''),
  entities: [User, Compaign, Company],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: configService.get<boolean>('POSTGRE_DB_SYNCHRONIZE', true),
});