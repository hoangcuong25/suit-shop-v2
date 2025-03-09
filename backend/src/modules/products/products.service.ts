import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product')
    private productModel: Model<Product>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(createProductDto: CreateProductDto, images) {
    const { name, type, oldPrice, newPrice } = createProductDto

    if (!images || images.length !== 2) {
      throw new BadRequestException('You have to upload 2 image')
    }

    // upload image to cloudinary
    const imageUpload1 = await this.cloudinaryService.uploadFile(images[0])
    const imageUrl1 = imageUpload1.url

    const imageUpload2 = await this.cloudinaryService.uploadFile(images[1])
    const imageUrl2 = imageUpload2.url

    const isName = await this.productModel.findOne({ name })
    if (isName) {
      throw new BadRequestException('This product already exist')
    }

    const productData = {
      name,
      type,
      oldPrice,
      newPrice,
      image1: imageUrl1,
      image2: imageUrl2,
    }

    const newProduct = new this.productModel(productData)
    await newProduct.save()

    return 'ok'
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
