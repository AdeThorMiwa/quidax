import PrismaService from '@services/prisma';
import { Prisma, Cart } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
class CartRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  async createAvailability(numOfAvailability: number) {
    return this.prisma.availability.create({
      data: { total: numOfAvailability },
    });
  }

  async getAll(builderResult = {}): Promise<Cart[]> {
    return this.prisma.cart.findMany({ ...builderResult });
  }

  async getById(uid: string): Promise<Cart> {
    const cart = await this.prisma.cart.findFirst({ where: { uid } });
    if (!cart) throw new NotFoundException('No cart found with this ID');
    return cart;
  }

  async updateById(uid: string, data: Prisma.CartUpdateInput): Promise<Cart> {
    await this.getById(uid);
    return this.prisma.cart.update({ where: { uid }, data });
  }

  async updateAvailability(uid: string, data: Prisma.AvailabilityUpdateInput) {
    return this.prisma.availability.update({ where: { uid }, data });
  }

  async deleteById(uid: string): Promise<Cart> {
    await this.getById(uid);
    return this.prisma.cart.delete({ where: { uid } });
  }

  async inActivateCartWithUserId(user_id: string) {
    await this.prisma.cart.updateMany({
      where: { user_id },
      data: {
        is_active: false,
      },
    });
  }

  async newCartItem(
    cart_id: string,
    item_id: string,
    item_count: number,
    sub_total: number,
  ) {
    await this.getById(cart_id);
    return this.prisma.cartItem.create({
      data: {
        cart_id,
        item_id,
        item_count,
        sub_total,
      } as any,
    });
  }

  async getCartItems(cart_id: string) {
    await this.getById(cart_id);
    return this.prisma.cartItem.findMany({ where: { cart_id } });
  }

  async getCartItem(uid: string) {
    return this.prisma.cartItem.findFirst({ where: { uid } });
  }
  async getCartItemByItemId(item_id: string, cart_id: string) {
    return this.prisma.cartItem.findFirst({ where: { item_id, cart_id } });
  }

  async deleteCartItem(uid: string) {
    return this.prisma.cartItem.delete({ where: { uid } });
  }
  async updateCartItem(uid: string, item_count: number) {
    return this.prisma.cartItem.update({
      where: { uid },
      data: { item_count },
    });
  }
}

export default CartRepository;
