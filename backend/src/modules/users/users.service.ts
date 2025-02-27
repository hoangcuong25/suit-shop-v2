import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schems';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { hashPasswordHelper } from 'src/helpers/util';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private readonly mailerService: MailerService
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email })

    if (user) return true
    return false
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, password1, password2, dob, phone } = createUserDto

      const isExist = await this.isEmailExist(email)
      if (isExist) {
        throw new BadRequestException('Email already exists')
      }

      if (password1 !== password2) {
        throw new BadRequestException('Password not match')
      }

      const isPhone = await this.userModel.findOne({ phone })
      if (isPhone) {
        throw new BadRequestException('Phone already exists')
      }

      if (phone.length !== 10) {
        throw new BadRequestException('Phone number must be 10 digits')
      }

      const hashPassword = await hashPasswordHelper(password1)
      const codeId = uuidv4()

      const user = await this.userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        dob,
        phone,
        isActive: false,
        codeId: codeId,
        codeExpired: dayjs().add(5, 'minute')
      })

      return {
        _id: user._id,
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('internal server error')
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async handleRegister(registerDto: CreateAuthDto) {
    try {
      const { firstName, lastName, email, password1, password2, dob, phone } = registerDto

      const isExist = await this.isEmailExist(email)
      if (isExist) {
        throw new BadRequestException('Email already exists')
      }

      if (password1 !== password2) {
        throw new BadRequestException('Password not match')
      }

      const isPhone = await this.userModel.findOne({ phone })
      if (isPhone) {
        throw new BadRequestException('Phone already exists')
      }

      if (phone.length !== 10) {
        throw new BadRequestException('Phone number must be 10 digits')
      }

      const hashPassword = await hashPasswordHelper(password1)
      const codeId = uuidv4()

      const user = await this.userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        dob,
        phone,
        isActive: false,
        codeId: codeId,
        codeExpired: dayjs().add(5, 'minute')
      })

      this.mailerService.sendMail({
        to: user.email, // list of receivers
        subject: 'Activate your account', // Subject line
        template: "register",
        context: {
          name: `${user.firstName} ${user.lastName}`,
          activationCode: codeId
        }
      })

      return {
        _id: user._id,
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('internal server error')
    }
  }

  async findAll() {
    return await this.userModel.find()
  }

  async getProfile(req) {
    return await this.userModel.findById(req._id)
  }

  async updateProfile(req, updateUserDto) {
    const { firstName, lastName, phone, dob } = updateUserDto
    const user = await this.userModel.findById(req._id)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    user.firstName = firstName
    user.lastName = lastName
    user.phone = phone
    user.dob = dob
    await user.save()

    return {
      success: true
    }
  }
}
