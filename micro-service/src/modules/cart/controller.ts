import { Controller, UseGuards } from '@nestjs/common';
import CartService from '@cart/service';
import {
  ItemToCartDto,
  CreateCartDto,
  RemoveItemToCartDto,
  UpdateCartItemDto,
} from '@cart/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import AuthGuard from '@guards/auth';

@Controller()
class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('create_cart')
  @UseGuards(AuthGuard)
  async createCart(@Payload() payload: CreateCartDto) {
    return await this.cartService.createCart(payload);
  }

  @MessagePattern('read_carts')
  @UseGuards(AuthGuard)
  async getAllCarts(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.cartService.getAllCarts(payload);
  }

  @MessagePattern('read_cart')
  @UseGuards(AuthGuard)
  async getCart(@Payload() payload: { cart_id: string }) {
    return await this.cartService.getCart(payload.cart_id);
  }

  @MessagePattern('patch_cart')
  @UseGuards(AuthGuard)
  async updateCart(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.cartService.updateCart(payload.cart_id, {
      ...payload,
      cart_id: undefined,
    });
  }

  @MessagePattern('delete_cart')
  @UseGuards(AuthGuard)
  async deleteCart(@Payload() payload: { cart_id: string }) {
    return await this.cartService.deleteCart(payload.cart_id);
  }

  @MessagePattern('set_active')
  @UseGuards(AuthGuard)
  async setActive(@Payload() payload: { cart_id: string; auth_token: string }) {
    return await this.cartService.setCartAsActive(
      payload.cart_id,
      payload.auth_token,
    );
  }

  @MessagePattern('add_to_cart')
  @UseGuards(AuthGuard)
  async addItemToCart(@Payload() payload: ItemToCartDto) {
    return await this.cartService.addItemToCart(payload);
  }

  @MessagePattern('read_cart_items')
  @UseGuards(AuthGuard)
  async readCartItems(@Payload() payload: { cart_id: string }) {
    return await this.cartService.getCartItems(payload.cart_id);
  }

  @MessagePattern('remove_from_cart')
  @UseGuards(AuthGuard)
  async removeItemFromCart(@Payload() payload: RemoveItemToCartDto) {
    return await this.cartService.removeFromCart(payload);
  }

  @MessagePattern('update_cart_item')
  @UseGuards(AuthGuard)
  async updateCartItem(@Payload() payload: UpdateCartItemDto) {
    return await this.cartService.updateCartItem(payload);
  }
}

export default CartController;
