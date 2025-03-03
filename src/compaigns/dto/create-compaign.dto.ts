import { IsNotEmpty } from 'class-validator';

export class CreateCompaignDto {
    @IsNotEmpty()
    name: string; 
}
