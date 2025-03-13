import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseMessage, Roles } from 'src/decorator/customize';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('order')
  @ResponseMessage('user order')
  create(
    @Body() body,
    @Req() req,
  ) {
    return this.ordersService.create(req.user._id, body);
  }

  @Get('get-orders')
  getOrder(@Req() req) {
    return this.ordersService.getOrder(req.user._id);
  }

  @Get('get-all-orders')
  @Roles('admin')
  getAllOrder() {
    return this.ordersService.getAllOrder()
  }
}
