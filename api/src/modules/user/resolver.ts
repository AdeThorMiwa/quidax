import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { USER_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { User, Token } from '@entities/object-types';
import { AuthUserDto, CreateUserDto, UpdateUserDto } from '@user/dto';
import { callService } from '@utils/app';

@Resolver(() => User)
class UserResolver {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @Mutation(() => User)
  async register(
    @Args('body') body: CreateUserDto,
  ): Promise<User & { token: string }> {
    return callService(this.userService, 'create_user', body);
  }

  @Mutation(() => Token)
  async login(
    @Args('body') body: AuthUserDto,
  ): Promise<{ user: User; token: string }> {
    return callService(this.userService, 'auth_user', body);
  }

  @Query(() => [User])
  async users(
    @Args('query') q: string,
    @Context() context: any,
  ): Promise<User[]> {
    return callService(this.userService, 'read_users', {
      ...JSON.parse(q),
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => User)
  async user(
    @Args('userId') userId: string,
    @Context() context: any,
  ): Promise<User> {
    return callService(this.userService, 'read_user', {
      user_id: userId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => User)
  async update_user(
    @Args('userId') userId: string,
    @Args('body') body: UpdateUserDto,
    @Context() context: any,
  ): Promise<User> {
    return callService(this.userService, 'patch_user', {
      ...body,
      user_id: userId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => User)
  async delete_user(
    @Args('userId') userId: string,
    @Context() context: any,
  ): Promise<User> {
    return callService(this.userService, 'delete_user', {
      user_id: userId,
      auth_token: context.req.headers.authorization,
    });
  }
}

export default UserResolver;
