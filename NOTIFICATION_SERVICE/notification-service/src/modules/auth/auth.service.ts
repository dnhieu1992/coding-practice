import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private safeUser(user: UserEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;
    return userData;
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.getUserByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const userEntity = new UserEntity();
    userEntity.email = registerDto.email;
    userEntity.password = hashedPassword;
    userEntity.firstName = '';
    userEntity.lastName = '';
    userEntity.phone = '';
    userEntity.address = '';
    const user = await this.userService.createUser(userEntity);

    const token = this.signToken(user.id, user.email);

    return {
      user: this.safeUser(user),
      accessToken: token,
    };
  }

  async signToken(userId: string, email: string) {
    return this.jwtService.signAsync({ id: userId, email });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.email);

    return {
      user: this.safeUser(user),
      accessToken: token,
    };
  }
}
