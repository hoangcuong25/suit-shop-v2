import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty({ message: 'Id cannot be empty' })
    userId: string;

    @IsNotEmpty({ message: 'Status cannot be empty' })
    status: string;

    @IsNotEmpty({ message: 'cannot be empty' })
    productList: any[];

    @IsNotEmpty({ message: 'cannot be empty' })
    date: number;

    @IsNotEmpty({ message: 'cannot be empty' })
    price: number;

    @IsNotEmpty({ message: 'cannot be empty' })
    optionShip: string;

    @IsNotEmpty({ message: 'cannot be empty' })
    optionPayment: string;

    @IsNotEmpty({ message: 'cannot be empty' })
    isPay: string;
}