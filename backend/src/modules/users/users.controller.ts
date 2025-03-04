import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post('create')
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('find-all')
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('get-profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user)
  }

  @Patch('update-profile')
  @ResponseMessage("Update profile")
  @UseInterceptors(FileInterceptor('file'))
  updateProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.usersService.updateProfile(req.user, updateUserDto, file)
  }

  @Patch('update-phone')
  @ResponseMessage("Update phone")
  updatePhone(
    @Req() req,
    @Body() reqBody: { phone: string }
  ) {
    return this.usersService.updatePhone(req.user, reqBody.phone)
  }

  @Patch('update-password')
  @ResponseMessage("Update Password")
  updatePassword(
    @Req() req,
    @Body() reqBody: {
      newPassword1: string,
      newPassword2: string,
      oldPassword: string
    }
  ) {
    return this.usersService.updatePassword(req.user, reqBody)
  }
}
