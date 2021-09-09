import { Controller, UseGuards } from '@nestjs/common';
import BookService from '@book/service';
import {
  BookRatingDto,
  CreateBookDto,
  LikeBookDto,
  UpdateAvaialabilityDto,
} from '@book/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import AuthGuard from '@guards/auth';

@Controller()
class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('create_book')
  @UseGuards(AuthGuard)
  async createBook(@Payload() payload: CreateBookDto) {
    return await this.bookService.createBook(payload);
  }

  @MessagePattern('read_books')
  @UseGuards(AuthGuard)
  async getAllBooks(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.bookService.getAllBooks(payload);
  }

  @MessagePattern('read_book')
  @UseGuards(AuthGuard)
  async getBook(@Payload() payload: { book_id: string }) {
    return await this.bookService.getBook(payload.book_id);
  }

  @MessagePattern('patch_book')
  @UseGuards(AuthGuard)
  async updateBook(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.bookService.updateBook(payload.book_id, {
      ...payload,
      book_id: undefined,
    });
  }

  @MessagePattern('delete_book')
  @UseGuards(AuthGuard)
  async deleteBook(@Payload() payload: { book_id: string }) {
    return await this.bookService.deleteBook(payload.book_id);
  }

  @MessagePattern('rate_book')
  @UseGuards(AuthGuard)
  async rateBook(@Payload() payload: BookRatingDto) {
    return await this.bookService.rate(payload);
  }

  @MessagePattern('like_book')
  @UseGuards(AuthGuard)
  async likeBook(@Payload() payload: LikeBookDto) {
    delete payload.auth_token;
    return await this.bookService.like(payload);
  }

  @MessagePattern('update_book_availability')
  @UseGuards(AuthGuard)
  async updateAvaialability(@Payload() payload: UpdateAvaialabilityDto) {
    delete payload.auth_token;
    return await this.bookService.updateAvailability(payload);
  }
}

export default BookController;
