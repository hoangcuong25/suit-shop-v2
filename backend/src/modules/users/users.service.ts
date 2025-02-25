import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schems';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private userModel: Model<User>,

    // private readonly mailerService: MailerService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, dob, email, password1, password2, phone } = createUserDto;

    const user = await this.userModel.findOne({ email: email });

    if (user) {
      throw new Error('User already exists');
    }

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
