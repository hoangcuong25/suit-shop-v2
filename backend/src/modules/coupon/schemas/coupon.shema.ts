import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schems';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ timestamps: true })
export class Coupon {
    @Prop({ type: String, required: true, unique: true })
    code: string;

    @Prop({ type: Number, required: true })
    discount: number

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    userId: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
