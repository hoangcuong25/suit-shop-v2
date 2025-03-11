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
  @Public()
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
  @Public()
  @Roles('admin')
  deleteProduct(@Body() body) {
    return this.productsService.deleteProduct(body.productId)
  }

  @Post('comment')
  @ResponseMessage('comment about product')
  comment(
    @Body() body,
    @Req() req
  ) {
    return this.productsService.comment(req.user, body)
  }

  @Post('rating-product')
  @ResponseMessage('rating product')
  ratingProduct(
    @Req() req,
    @Body() body
  ) {
    return this.productsService.ratingProduct(req.user._id, body)
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

  @Post('remove-from-cart')
  @ResponseMessage('remove product from cart')
  removeFromCart(
    @Req() req,
    @Body() body
  ) {
    return this.productsService.removeFromCart(req.user._id, body.productId)
  }

  @Post('increase-quantity')
  @ResponseMessage('increase quantity product')
  increaseQuantity(
    @Req() req,
    @Body() body
  ) {
    return this.productsService.increaseQuantity(req.user._id, body)
  }

  @Post('decrease-quantity')
  @ResponseMessage('decrease quantity product')
  decreaseQuantity(
    @Req() req,
    @Body() body
  ) {
    return this.productsService.decreaseQuantity(req.user._id, body)
  }

  @Get('search')
  @Public()
  @ResponseMessage('search products')
  search(@Query() query) {
    return this.productsService.search(query.query)
  }

  @Get('get-all-product')
  @ResponseMessage('search products')
  @Roles('admin')
  @Public()
  getAllProduct() {
    return this.productsService.getAllProduct()
  }
}
