import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schems';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Order') private orderModel: Model<Order>,
  ) { }

  async create(userId, body) {
    const { productInfor, subtotal, optionShip, optionPayment, isPay, codeUse } = body

    const cart = []
    const productList: any[] = []

    for (const i of productInfor) {
      const product = await this.productModel.findById(i.productId)

      productList.push({
        productList: product,
        quantity: i.quantity,
        size: i.size,
        length: i.length
      })
    }

    const orderData = {
      userId: userId,
      productList: productList,
      date: Date.now(),
      price: subtotal,
      optionShip: optionShip,
      optionPayment: optionPayment,
      isPay: isPay
    }

    const newOrder = new this.orderModel(orderData)
    await newOrder.save()

    if (isPay) {
      const user = await this.userModel.findById(userId)
      if (user) {
        const newPoints = user.points + 1000
        await this.userModel.findByIdAndUpdate(userId, { points: newPoints })
      }
    }

    // if (codeUse) {
    //   const coupon = await this.couponModel.findOne({ userId: userId, code: codeUse })
    //   const couponId = coupon._id
    //   const newIsActive = false
    //   await couponModel.findByIdAndUpdate(couponId, { isActive: newIsActive })
    // }

    await this.userModel.findByIdAndUpdate(userId, { cart: cart })

    return 'ok'
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
