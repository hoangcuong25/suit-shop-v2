import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schems';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: String, required: true, ref: User.name })
    userId: string;

    @Prop({ type: String, required: true })
    userName: string;

    @Prop({ type: String, required: true, })
    role: string;

    @Prop({ type: String, required: true,  })
    message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
