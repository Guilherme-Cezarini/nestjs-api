import { PartialType } from '@nestjs/mapped-types';
import { CreateCompaignDto } from './create-compaign.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompaignDto extends PartialType(CreateCompaignDto) {

    @IsNotEmpty()
    name: string; 
}
