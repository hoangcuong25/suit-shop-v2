import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, minimize: false })
export class Product {
    @Prop({ type: String, required: true, unique: true })
    name: string;

    @Prop({ type: String, required: true })
    type: string;

    @Prop({ type: Number, required: true })
    oldPrice: number;

    @Prop({ type: Number, required: true })
    newPrice: number;

    @Prop({ type: String, required: true })
    image1: string;

    @Prop({ type: String, required: true })
    image2: string;

    @Prop({ type: Array, default: [] })
    comments: any[];

    @Prop({ type: Boolean, default: false })
    interesting: Boolean;

    @Prop({ type: Array, default: [] })
    rate: any[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
