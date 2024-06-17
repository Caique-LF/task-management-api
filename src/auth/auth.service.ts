import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import{compareSync as bcryptCompareSync} from 'bcrypt';
import { AuthRessponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpiratioTimeInSeconds: number;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService : ConfigService
    ){
        this.jwtExpiratioTimeInSeconds = +this.configService.get<number>('JWT_EXPERATION_TIME');
    }

    signIn(userName: string, password : string): AuthRessponseDto{
        const foundUser = this.usersService.findByUserName(userName);

        if(!foundUser || !bcryptCompareSync(password, foundUser.password)){
            throw new UnauthorizedException();
        }

        const payload = {sub: foundUser.id, userName : foundUser.userName};

        const token = this.jwtService.sign(payload, { expiresIn: this.jwtExpiratioTimeInSeconds });
        
        return {token, expiresIn : this.jwtExpiratioTimeInSeconds}
        
    }
}
