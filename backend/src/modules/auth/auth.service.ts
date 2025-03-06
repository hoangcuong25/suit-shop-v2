import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswordHelper } from 'src/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRedis() private readonly redis: Redis
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await comparePasswordHelper(pass, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  createRefreshToken = (payload: any) => {
    const refreshExpire = this.configService.get<string>("JWT_REFRESH_EXPIRE") || "1d"
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: ms(refreshExpire as ms.StringValue) / 1000
    });
    return refresh_token;
  }

  async storeRefreshToken(userId, refresh_token) {
    await this.redis.set(`refresh_token:${userId}`, refresh_token, "EX", 1 * 24 * 60 * 60); // 7days
  }

  async login(user: any, response: Response) {
    const payload = {
      sub: 'token',
      iss: 'from server',
      _id: user._id,
    };

    const refresh_token = this.createRefreshToken(payload);

    await this.storeRefreshToken(user._id, refresh_token)

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token
    };
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto)
  }

  async logout(req) {
    try {
      const access_token = req.headers.authorization?.split(' ')[1]

      if (access_token) {
        const decoded = this.jwtService.verify(access_token, { secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET") })
        await this.redis.del(`refresh_token:${decoded._id}`);
      }

      return 'ok'
    }
    catch {
      throw new UnauthorizedException
    }
  }

  async refreshToken(req) {
    const refreshToken = req.headers.refreshtoken

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided!!!')
    }

    const decoded = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET") })
    const storedToken = await this.redis.get(`refresh_token:${decoded._id}`);

    if (storedToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const payload = {
      sub: 'token',
      iss: 'from server',
      _id: decoded._id,
    };

    return this.jwtService.sign(payload)
  }
}
