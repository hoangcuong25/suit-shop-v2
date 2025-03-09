import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public, ResponseMessage, Roles } from 'src/decorator/customize';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Get('all-product')
  @ResponseMessage('find all product')
  @Public()
  findAll(
    @Param('limit') limit: number,
    @Param('page') page: number,
    @Param('type') type: string,
    @Param('price_option') price_option: string,
    @Param('sort ') sort: string,
  ) {
    return this.productsService.findAll(limit, page, type, price_option, sort);
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
  ){
    return this.productsService.comment(body, req.user)
  }
}
