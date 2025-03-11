import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post('buy-coupon')
  @ResponseMessage('buy coupon')
  create(
    @Req() req,
    @Body() body
  ) {
    return this.couponService.create(req.user._id, body.coupon);
  }

  @Get('get-coupon')
  @ResponseMessage('get coupon')
  getCoupon(@Req() req) {
    return this.couponService.getCoupon(req.user._id)
  }
}
