import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public, ResponseMessage, Roles } from 'src/decorator/customize';
import { FilesInterceptor } from '@nestjs/platform-express';
import { query } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('add-product')
  @ResponseMessage('add product')
  @Roles('admin')
  @UseInterceptors(FilesInterceptor('images', 2))
  create(
    @Body() createProductDto,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    return this.productsService.create(createProductDto, images)
  }

  @Post('fetch-product')
  @ResponseMessage('fetch product')
  @Public()
  findAll(
    @Body() body
  ) {
    return this.productsService.fetchProduct(body?.limit, body?.page, body?.type, body?.price_option, body?.sort)
  }

  @Post('get-product-by-id')
  @ResponseMessage('get product by id')
  @Public()
  getProductById(@Body() body) {
    return this.productsService.getProductById(body.productId)
  }

  @Post('delete-product')
  @ResponseMessage('delete product')
  @Roles('admin')
  deleteProduct(@Body() body) {
    return this.productsService.deleteProduct(body._id)
  }

  @Post('comment')
  @ResponseMessage('comment about product')
  comment(
    @Body() body,
    @Req() req
  ) {
    return this.productsService.comment(req.user, body)
  }

  @Post('get-rates')
  @ResponseMessage('get rate of product')
  @Public()
  getRate(@Body() body) {
    return this.productsService.getRate(body.productId)
  }

  @Post('wishlist')
  @ResponseMessage('wishlist product')
  wishlist(
    @Body() body,
    @Req() req
  ) {
    return this.productsService.wishlist(body.productId, req.user)
  }

  @Get('get-interesting-products')
  @ResponseMessage('get interesting products')
  @Public()
  getInterestingProducts() {
    return this.productsService.getInterestingProducts()
  }

  @Post('add-to-cart')
  @ResponseMessage('add product to cart')
  addToCart(
    @Req() req,
    @Body() body
  ) {
    return this.productsService.addToCart(req.user._id, body)
  }
}
