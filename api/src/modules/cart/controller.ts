import {
  CreateCartDto,
  ItemToCartDto,
  RemoveItemToCartDto,
  UpdateCartItemDto,
} from '@cart/dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CART_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@ApiTags('Cart')
@ApiBearerAuth('Authorization')
@Controller('/carts')
class CartController {
  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ClientProxy,
  ) {}

  @Post('/')
  async newCart(@Body() body: CreateCartDto, @Req() req: any) {
    return callService(this.cartService, 'create_cart', {
      ...body,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/')
  async getCarts(@Query() q: any, @Req() req: any) {
    return callService(this.cartService, 'read_carts', {
      ...q,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/:cart_id')
  async getCart(@Param('cart_id') cartId: string, @Req() req: any) {
    return callService(this.cartService, 'read_cart', {
      cart_id: cartId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:cart_id')
  async updateCart(
    @Param('cart_id') cartId: string,
    @Body() body: CreateCartDto,
    @Req() req: any,
  ) {
    return callService(this.cartService, 'patch_cart', {
      ...body,
      cart_id: cartId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:cart_id')
  async addToCart(
    @Param('cart_id') cartId: string,
    @Body() body: ItemToCartDto,
    @Req() req: any,
  ) {
    return callService(this.cartService, 'add_to_cart', {
      ...body,
      cart_id: cartId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:cart_id')
  async removeFromCart(
    @Param('cart_id') cartId: string,
    @Body() body: RemoveItemToCartDto,
    @Req() req: any,
  ) {
    return callService(this.cartService, 'remove_from_cart', {
      ...body,
      cart_id: cartId,
      auth_token: req.headers.authorization,
    });
  }

  @Delete('/:cart_id')
  async deleteCart(@Param('cart_id') cartId: string, @Req() req: any) {
    return callService(this.cartService, 'delete_cart', {
      cart_id: cartId,
      auth_token: req.headers.authorization,
    });
  }
  @Patch('/cart-item/:item_id')
  async updateCartItem(@Body() body: UpdateCartItemDto) {
    return callService(this.cartService, 'update_cart_item', body);
  }
}

export default CartController;
