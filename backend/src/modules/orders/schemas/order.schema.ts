import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schems';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, minimize: false })
export class Order {
    @Prop({ type: String, required: true, ref: User.name })
    userId: string

    @Prop({ type: String, default: 'Processing' })
    status: string;

    @Prop({ type: Array, default: [] })
    productList: any[];

    @Prop({ type: Number, required: true })
    date: number;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, required: true })
    optionShip: string;

    @Prop({ type: String, required: true })
    optionPayment: string;

    @Prop({ type: Boolean, default: false })
    isPay: Boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
