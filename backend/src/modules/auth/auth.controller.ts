import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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

  @Post('send-email-active')
  @ResponseMessage('send mail active account')
  sendMail(@Req() req) {
    return this.authService.sendEmailActive(req.user)
  }

  @Post('comfirm-active')
  @ResponseMessage('comfirm active account')
  comfirmActive(
    @Req() req,
    @Body() body
  ) {
    return this.authService.comfirmActive(req.user, body.codeId)
  }

  @Post('send-reset-otp')
  @Public()
  @ResponseMessage('send reset otp password')
  sendResetOtp(@Body() body) {
    return this.authService.sendResetOtp(body.email)
  }

  @Post('reset-password')
  @Public()
  @ResponseMessage('comfirm active account')
  resetPassword(@Body() body) {
    return this.authService.resetPassword(body.email, body.otp, body.newPassword)
  }

  @Post('login-google')
  @Public()
  @ResponseMessage('login with goole')
  loginGoole(@Body() body) {
    return this.authService.loginGoole(body.firstName, body.lastName, body.email, body.image)
  }

  @Post('logout')
  @ResponseMessage('logout')
  logout(@Req() req) {
    return this.authService.logout(req)
  }
}
