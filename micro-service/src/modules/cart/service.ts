import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cart } from '@prisma/client';
import {
  ItemToCartDto,
  CreateCartDto,
  RemoveItemToCartDto,
  UpdateCartItemDto,
} from '@cart/dto';
import CartRepository from '@cart/repository';
import QueryBuilder from '@utils/querybuilder';
import { retrieveTokenValue } from '@utils/jwt';
import { BOOK_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@Injectable()
class CartService {
  private logger: Logger = new Logger(CartService.name);
  constructor(
    private cartRepository: CartRepository,
    @Inject(BOOK_SERVICE)
    private readonly bookService: ClientProxy,
  ) {}

  async createCart(data: CreateCartDto): Promise<Cart> {
    try {
      // get writer
      this.logger.log(data.auth_token, `Get writer from auth token`);
      const userId = await this.getUserIDFromToken(data.auth_token);

      const cart = await this.cartRepository.create({
        name: data.name,
        user: { connect: { uid: userId } },
      });
      this.logger.log(cart, 'New Cart');

      return cart;
    } catch (e) {
      this.logger.error(e.message, 'Error creating cart');

      throw new BadRequestException(e.message);
    }
  }

  async getAllCarts(q: any): Promise<Cart[]> {
    this.logger.log(JSON.stringify(q), 'Input Query Parameter');

    try {
      const builder = new QueryBuilder(q);
      const query = builder.build(['filter', 'paginate', 'select', 'sort']);

      this.logger.log(JSON.stringify(query), 'Builder Query');

      return await this.cartRepository.getAll(query);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching carts');

      throw new BadRequestException(e.message);
    }
  }

  async getCart(cartId: string): Promise<Cart> {
    this.logger.log(cartId, 'Cart ID');

    try {
      return await this.cartRepository.getById(cartId);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching cart');

      throw new BadRequestException(e.message);
    }
  }

  async updateCart(cartId: string, body: CreateCartDto): Promise<Cart> {
    this.logger.log(cartId, 'Cart ID');

    try {
      return await this.cartRepository.updateById(cartId, body);
    } catch (e) {
      this.logger.error(e.message, 'Error updating cart');

      throw new BadRequestException(e.message);
    }
  }

  async deleteCart(cartId: string): Promise<Cart> {
    this.logger.log(cartId, 'Cart ID');

    try {
      return await this.cartRepository.deleteById(cartId);
    } catch (e) {
      this.logger.error(e.message, 'Error deleting cart');

      throw new BadRequestException(e.message);
    }
  }

  async setCartAsActive(cart_id: string, auth_token: string) {
    this.logger.log(cart_id, 'Cart ID');

    try {
      // get user id from token
      this.logger.log(auth_token, 'Get user id from auth token');
      const userId = await this.getUserIDFromToken(auth_token);
      this.logger.log(userId, 'User ID');

      // find and set currently active cart(s) as inactive
      await this.cartRepository.inActivateCartWithUserId(userId);

      // update the active cart to the cart witht cart_id
      return await this.cartRepository.updateById(cart_id, { is_active: true });
    } catch (e) {
      this.logger.error(e.message, 'Error setting cart as active');

      throw new BadRequestException(e.message);
    }
  }

  async addItemToCart({
    cart_id,
    book_id,
    item_count,
    auth_token,
  }: ItemToCartDto) {
    this.logger.log(cart_id, 'Cart ID');

    try {
      // get user id from token
      this.logger.log(auth_token, 'Get user id from auth token');
      const userId = await this.getUserIDFromToken(auth_token);
      this.logger.log(userId, 'User ID');

      // get item by its ID
      const item = await callService(this.bookService, 'read_book', {
        book_id,
        auth_token,
      });
      // calculate item subtotal
      const sub_total = item.price * item_count;

      // create new cart item
      const new_cart_item = await this.cartRepository.newCartItem(
        cart_id,
        book_id,
        item_count,
        sub_total,
      );

      // update cart items count and subtotal
      const cart = await this.cartRepository.updateById(cart_id, {
        items_count: { increment: item_count },
        sub_total: { increment: sub_total },
      });

      return { cart, new_cart_item };
    } catch (e) {
      this.logger.error(e.message, 'Error adding items to cart');

      throw new BadRequestException(e.message);
    }
  }

  async getCartItems(cart_id: string) {
    this.logger.log(cart_id, 'Cart ID');

    try {
      return await this.cartRepository.getCartItems(cart_id);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching cart items');

      throw new BadRequestException(e.message);
    }
  }

  async removeFromCart({ cart_id, book_id }: RemoveItemToCartDto) {
    this.logger.log(cart_id, 'Cart ID');

    try {
      // get cart item
      const item = await this.cartRepository.deleteCartItem(book_id);

      // update cart items count and subtotal
      const cart = await this.cartRepository.updateById(cart_id, {
        items_count: { decrement: item.item_count },
        sub_total: { decrement: item.sub_total },
      });

      return { cart, item };
    } catch (e) {
      this.logger.error(e.message, 'Error deleting items from cart');

      throw new BadRequestException(e.message);
    }
  }
  async updateCartItem({ item_count, book_id, cart_id }: UpdateCartItemDto) {
    try {
      // get cart item
      const item = await this.cartRepository.getCartItemByItemId(
        book_id,
        cart_id,
      );

      // update cart items count and subtotal
      const cart = await this.cartRepository.updateCartItem(
        item.uid,
        item_count,
      );
      return { cart, item };
    } catch (e) {
      this.logger.error(e.message, 'Error deleting items from cart');

      throw new BadRequestException(e.message);
    }
  }

  private async getUserIDFromToken(token: string) {
    this.logger.log(token, `Get writer from auth token`);
    token = token.split('Bearer')[1].trim();
    return (await retrieveTokenValue<{ id: string }>(token)).id;
  }
}

export default CartService;
