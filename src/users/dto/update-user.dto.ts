import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsEmail()
    email: string; 
    
    @IsNotEmpty()
    @MaxLength(12)
    password: string;     
}
