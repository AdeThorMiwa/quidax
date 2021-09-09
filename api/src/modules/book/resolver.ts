import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { BOOK_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Book } from '@entities/object-types';
import {
  BookRatingDto,
  CreateBookDto,
  UpdateAvaialabilityDto,
  UpdateBookDto,
} from '@book/dto';
import { callService } from '@utils/app';

@Resolver(() => Book)
class BookResolver {
  constructor(
    @Inject(BOOK_SERVICE)
    private readonly bookService: ClientProxy,
  ) {}

  @Mutation(() => Book)
  async create_book(
    @Args('body') body: CreateBookDto,
    @Context() context: any,
  ): Promise<Book & { token: string }> {
    return callService(this.bookService, 'create_book', {
      ...body,
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => [Book])
  books(@Context() context: any, @Args('query') q?: string): Promise<Book[]> {
    return callService(this.bookService, 'read_books', {
      ...JSON.parse(q || '{}'),
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => Book)
  async book(
    @Args('bookId') bookId: string,
    @Context() context: any,
  ): Promise<Book> {
    return await callService(this.bookService, 'read_book', {
      book_id: bookId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Book)
  async update_book(
    @Args('bookId') bookId: string,
    @Args('body') body: UpdateBookDto,
    @Context() context: any,
  ): Promise<Book> {
    return callService(this.bookService, 'patch_book', {
      ...body,
      book_id: bookId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Book)
  async delete_book(
    @Args('bookId') bookId: string,
    @Context() context: any,
  ): Promise<Book> {
    return callService(this.bookService, 'delete_book', {
      book_id: bookId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Book)
  async rate_book(
    @Args('bookId') book_id: string,
    @Args('body') body: BookRatingDto,
    @Context() context: any,
  ) {
    return callService(this.bookService, 'rate_book', {
      ...body,
      book_id,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Book)
  async like_book(@Args('bookId') book_id: string, @Context() context: any) {
    return callService(this.bookService, 'like_book', {
      book_id,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Book)
  async update_availability(
    @Args('bookId') book_id: string,
    @Args('body') body: UpdateAvaialabilityDto,
    @Context() context: any,
  ) {
    return callService(this.bookService, 'update_book_availability', {
      ...body,
      book_id,
      auth_token: context.req.headers.authorization,
    });
  }
}

export default BookResolver;
