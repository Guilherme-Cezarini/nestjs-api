import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, UnauthorizedException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    ) {}
    
    async login(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOne({
          where : { email: loginUserDto.email 
        }});
    
        if(!user){
          throw new UnauthorizedException("Verify your credentials")
        }
      
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException("Verify your credentials")
    
        }
        const payload = { email: user.email, sub: user.id }; 
        return {
            access_token: this.jwtService.sign(payload),
        };
       
      }
    
}
