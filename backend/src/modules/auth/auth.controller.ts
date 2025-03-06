import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) { }

  @Post('login')
  @Public()
  @ResponseMessage('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(req.user, response);
  }

  @Post('register')
  @ResponseMessage('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post('refresh-token')
  @Public()
  @ResponseMessage('refresh token')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req)
  }

  @Get('mail')
  @ResponseMessage('send mail active account')
  @Public()
  sendMail() {
    this.mailerService
      .sendMail({
        to: 'cuongpro1t123@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        template: "register",
        context: {
          name: "cuong hoang",
          activationCode: 123456789
        }
      })
    return "ok";
  }

  @Post('logout')
  @ResponseMessage('logout')
  logout(@Req() req) {
    return this.authService.logout(req)
  }
}
