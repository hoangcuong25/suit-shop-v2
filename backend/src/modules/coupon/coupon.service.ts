import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './schemas/coupon.shema';
import { User } from '../users/schemas/user.schems';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CouponService {

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
  ) { }

  async create(userId, coupon) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    if (coupon === '2$' && user.points >= 5000) {
      const newPoints = user.points - 5000

      const couponData = {
        code: code,
        discount: 2,
        userId: userId
      }

      const newCoupon = new this.couponModel(couponData)
      await newCoupon.save()
      await this.userModel.findByIdAndUpdate(userId, { points: newPoints })

      return 'ok'
    }

    if (coupon === '5$' && user.points >= 5000) {
      const newPoints = user.points - 10000

      const couponData = {
        code: code,
        discount: 5,
        userId: userId
      }

      const newCoupon = new this.couponModel(couponData)
      await newCoupon.save()
      await this.userModel.findByIdAndUpdate(userId, { points: newPoints })

      return 'ok'
    }
  }

  async getCoupon(userId) {
    const coupons = await this.couponModel.find({ userId: userId, isActive: true });

    return coupons
  }

  
}
