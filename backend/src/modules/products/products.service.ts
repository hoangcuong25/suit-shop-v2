import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schems';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectRedis() private readonly redis: Redis,
    private readonly cloudinaryService: CloudinaryService,
    private usersService: UsersService,
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

  async fetchProduct(limit = 15, page = 1, type?: string, price_option?: string, sort?: string) {
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

  async comment(user, body) {
    const { comment, productId } = body

    if (!comment) {
      throw new BadRequestException('Let us know what you think')
    }

    const userData = await this.usersService.findById(user._id)

    const product = await this.productModel.findById(productId)

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const commentData = {
      userData: userData,
      comment: comment
    }

    return await this.productModel.updateOne(
      { _id: productId },
      { $push: { comments: commentData } }
    )
  }

  async getRate(productId) {
    const product = await this.productModel.findById(productId)

    if (!product) {
      throw new BadRequestException("Product nt found")
    }

    return product.rate
  }

  async wishlist(productId, user) {
    const userData = await this.usersService.findById(user._id)
    const productData = await this.productModel.findById(productId)

    if (!userData) {
      throw new BadRequestException('User not found');
    }

    let isProduct = false
    let indexProduct = 0

    userData.wishlist.forEach((i, index) => {
      if (i._id.toString() === productId) {
        isProduct = true
        indexProduct = index
      }
    })

    if (isProduct) {
      const wishlist = userData.wishlist
      wishlist.splice(indexProduct, 1)
      await this.userModel.findByIdAndUpdate(user._id, { wishlist })

      return 'Remove from success list'
    } else {
      const wishlistData = [...userData.wishlist, productData]
      await this.userModel.findByIdAndUpdate(user._id, { wishlist: wishlistData })

      return 'Add to list successfuly'
    }
  }

  async getInterestingProducts() {
    const cacheKey = 'interestingProducts';

    const cachedData = await this.redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const interestingProducts = await this.productModel.find({ interesting: true });

    await this.redis.setex(cacheKey, 60 * 60, JSON.stringify(interestingProducts));

    return interestingProducts
  }

  async addToCart(userId, body) {
    const { productId, size, length } = body

    if (!productId || !size || !length) {
      throw new BadRequestException('Chose size and length')
    }

    const productData = await this.productModel.findById(productId)
    const user = await this.userModel.findById(userId)

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const cart = user.cart

    let isHave = false
    let indexProduct = 0

    cart.forEach((i, index) => {
      if (i.product._id.toString() === productId) {

        if (i.amount.size === size && i.amount.length === length) {
          isHave = true
          indexProduct = index
        }
      }
    })

    if (isHave) {
      cart[indexProduct].amount.quantity += 1
      await this.userModel.findByIdAndUpdate(userId, { cart });

      return 'ok'
    } else {
      let amount = {
        quantity: 1,
        size: size,
        length: length
      }
      const addToCart = {
        product: productData,
        amount: amount
      }
      const cartData = [...cart, addToCart]

      await this.userModel.findByIdAndUpdate(userId, { cart: cartData })
      return 'ok'
    }
  }

  async removeFromCart(userId, productId) {
    const user = await this.userModel.findById(userId)

    if (!user) {
      throw new BadRequestException('User not found');
    }

    let indexProduct = 0
    const cart = user.cart

    cart.forEach((i, index) => {
      if (i.product._id.toString() === productId) {
        indexProduct = index
      }
    })

    cart.splice(indexProduct, 1)
    await this.userModel.findByIdAndUpdate(userId, { cart })

    return 'ok'
  }

  async increaseQuantity(userId, body) {
    const { productId, size, length } = body

    const user = await this.userModel.findById(userId)

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const cart = user.cart

    const indexProduct = cart.findIndex(i =>
      i.product._id.toString() === productId &&
      i.amount.size === size &&
      i.amount.length === length
    )

    cart[indexProduct].amount.quantity += 1

    await this.userModel.findByIdAndUpdate(userId, { cart })
    return 'ok'
  }

  async decreaseQuantity(userId, body) {
    const { productId, size, length } = body;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const cart = user.cart;

    const indexProduct = cart.findIndex(i =>
      i.product._id.toString() === productId &&
      i.amount.size === size &&
      i.amount.length === length
    );

    if (indexProduct === -1) {
      throw new BadRequestException('Product not found in cart');
    }

    if (cart[indexProduct].amount.quantity === 1) {
      cart.splice(indexProduct, 1);
    } else {
      cart[indexProduct].amount.quantity -= 1;
    }

    await this.userModel.findByIdAndUpdate(userId, { cart });

    return 'ok'
  }
}
