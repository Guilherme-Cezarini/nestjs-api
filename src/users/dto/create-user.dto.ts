import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string; 
  
    @IsNotEmpty()
    @MaxLength(12)
    password: string; 

    @IsNotEmpty()
    company_id: string
}
