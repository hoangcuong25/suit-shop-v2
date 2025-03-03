import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty({ message: 'First name cannot be empty' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name cannot be empty' })
    lastName: string;

    @IsNotEmpty({ message: 'Date of birth cannot be empty' })
    dob: string

    @IsNotEmpty({ message: 'Gender number cannot be empty' })
    gender: string;

    @IsNotEmpty({ message: 'Address number cannot be empty' })
    address: string;
}
