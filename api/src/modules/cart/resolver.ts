import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CART_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Cart } from '@entities/object-types';
import {
  CreateCartDto,
  UpdateCartItemDto,
  RemoveItemToCartDto,
  ItemToCartDto,
} from '@cart/dto';
import { callService } from '@utils/app';

@Resolver(() => Cart)
class CartResolver {
  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ClientProxy,
  ) {}

  @Mutation(() => Cart)
  async create_cart(
    @Args('body') body: CreateCartDto,
    @Context() context: any,
  ): Promise<Cart & { token: string }> {
    return callService(this.cartService, 'create_cart', {
      ...body,
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => [Cart])
  carts(@Context() context: any, @Args('query') q?: string): Promise<Cart[]> {
    return callService(this.cartService, 'read_carts', {
      ...JSON.parse(q || '{}'),
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => Cart)
  async cart(
    @Args('cartId') cartId: string,
    @Context() context: any,
  ): Promise<Cart> {
    return await callService(this.cartService, 'read_cart', {
      cart_id: cartId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Cart)
  async update_cart_item(
    @Args('cartId') cartId: string,
    @Args('body') body: UpdateCartItemDto,
    @Context() context: any,
  ): Promise<Cart> {
    return callService(this.cartService, 'update_cart_item', {
      ...body,
      cart_id: cartId,
      auth_token: context.req.headers.authorization,
    });
  }
  @Mutation(() => Cart)
  async add_to_cart(
    @Args('cartId') cartId: string,
    @Args('body') body: ItemToCartDto,
    @Context() context: any,
  ): Promise<Cart> {
    return callService(this.cartService, 'add_to_cart', {
      ...body,
      cart_id: cartId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Cart)
  async remove_item_from_cart(
    @Args('cartId') cartId: string,
    @Args('body') body: RemoveItemToCartDto,
    @Context() context: any,
  ): Promise<Cart> {
    return callService(this.cartService, 'remove_from_cart', {
      ...body,
      cart_id: cartId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Cart)
  async delete_cart(
    @Args('cartId') cartId: string,
    @Context() context: any,
  ): Promise<Cart> {
    return callService(this.cartService, 'delete_cart', {
      cart_id: cartId,
      auth_token: context.req.headers.authorization,
    });
  }
}

export default CartResolver;
