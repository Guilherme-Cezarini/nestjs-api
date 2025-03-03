import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginServcie: LoginService) {}

  
  @Post()
  login(@Body() loginDto: LoginUserDto) {
    return this.loginServcie.login(loginDto);
  }
  
}
