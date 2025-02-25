import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, default: "Unknown" })
    phone: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    dob: string;

    @Prop({ type: String, default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACX..." })
    image: string;

    @Prop({ type: String, default: "Unknown" })
    address: string;

    @Prop({ type: String, default: "Unknown" })
    gender: string;

    @Prop({ type: Array, default: [] })
    cart: any[];

    @Prop({ type: Array, default: [] })
    wishlist: any[];

    @Prop({ type: Number, default: 0 })
    points: number;

    @Prop({ type: String, default: "" })
    resetOpt: string;

    @Prop({ type: Date, default: 0 })
    resetOptExpireAt: Date;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: String, default: "" })
    codeId: string;

    @Prop({ type: Date, default: 0 })
    codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
