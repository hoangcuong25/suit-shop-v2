import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ]
})
export class OrdersModule { }
