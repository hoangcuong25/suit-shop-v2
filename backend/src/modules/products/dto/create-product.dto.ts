import { IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsNotEmpty({ message: 'Type cannot be empty' })
    type: string;

    @IsNotEmpty({ message: 'Old price cannot be empty' })
    oldPrice: number;

    @IsNotEmpty({ message: 'New price cannot be empty' })
    newPrice: number;
}
