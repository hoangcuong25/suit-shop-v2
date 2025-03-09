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

  async findAll(limit = 15, page = 1, type?: string, price_option?: string, sort?: string) {
    const filter: any = {};

    if (type) {
      filter.type = type;
    }

    if (price_option === 'option1') {
      filter.newPrice = { $gte: 100, $lt: 300 };
    } else if (price_option === 'option2') {
      filter.newPrice = { $gte: 300, $lte: 350 };
    }

    let query = this.productModel.find(filter);

    if (sort === 'low to high') {
      query = query.sort({ newPrice: 1 });
    } else if (sort === 'high to low') {
      query = query.sort({ newPrice: -1 });
    }

    // Đếm số lượng sản phẩm còn lại
    const remmainProducts = await query.clone().countDocuments();

    // Phân trang
    const products = await query.skip((page - 1) * limit).limit(Number(limit));

    return { productData: products, remmainProducts };
  }

  async getProductById(_id) {
    const productData = await this.productModel.findById(_id)

    return productData
  }

  async deleteProduct(_id: string) {
    await this.productModel.findByIdAndDelete(_id)
    return 'ok';
  }
}
