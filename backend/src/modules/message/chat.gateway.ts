import { InjectModel } from '@nestjs/mongoose';
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';

@WebSocketGateway({ cors: { origin: '*' } }) // Cho phép CORS để có thể kết nối từ frontend
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private server: Server;
    private userRooms: Map<string, string> = new Map(); // Lưu trữ userId và phòng

    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>
    ) { }

    // Gán server sau khi khởi tạo
    afterInit(server: Server) {
        this.server = server;
    }

    handleConnection(client: Socket) {
        // console.log(`Client connected: ${client.id}`);

        client.on("join_room", async (room) => {
            client.join(room);
            this.userRooms.set(client.id, room); // Lưu lại phòng của user

            const messages = await this.messageModel.find({ userId: room });
            client.emit("loadMessages", messages);
        });

        client.on("sendMessage", async ({ userId, userName, role, message }) => {
            const joinedRoom = this.userRooms.get(client.id);
            if (!joinedRoom) return;

            const newMessage = new this.messageModel({ userId, userName, role, message });
            await newMessage.save();

            this.server.to(joinedRoom).emit("receiveMessage", { userId, userName, role, message });

            client.broadcast.emit("newNotification", { userName, message });
        });
    }

    handleDisconnect(client: Socket) {
        // console.log(`Client disconnected: ${client.id}`);
        this.userRooms.delete(client.id); // Xóa khỏi danh sách phòng
    }

    // @SubscribeMessage('message')
    // handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
    //     console.log(`Received message from ${client.id}: ${message}`);
    //     this.server.emit('message', { sender: client.id, text: message }); // Gửi lại cho tất cả clients
    // }
}
