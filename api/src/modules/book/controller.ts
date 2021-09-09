import {
  BookRatingDto,
  CreateBookDto,
  UpdateAvaialabilityDto,
  UpdateBookDto,
} from '@book/dto';
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
import { BOOK_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@ApiTags('Book')
@ApiBearerAuth('Authorization')
@Controller('/books')
class BookController {
  constructor(
    @Inject(BOOK_SERVICE)
    private readonly bookService: ClientProxy,
  ) {}

  @Post('/')
  async newBook(@Body() body: CreateBookDto, @Req() req: any) {
    return callService(this.bookService, 'create_book', {
      ...body,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/')
  async getBooks(@Query() q: any, @Req() req: any) {
    return callService(this.bookService, 'read_books', {
      ...q,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/:book_id')
  async getBook(@Param('book_id') bookId: string, @Req() req: any) {
    return callService(this.bookService, 'read_book', {
      book_id: bookId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:book_id')
  async updateBook(
    @Param('book_id') bookId: string,
    @Body() body: UpdateBookDto,
    @Req() req: any,
  ) {
    return callService(this.bookService, 'patch_book', {
      ...body,
      book_id: bookId,
      auth_token: req.headers.authorization,
    });
  }

  @Delete('/:book_id')
  async deleteBook(@Param('book_id') bookId: string, @Req() req: any) {
    return callService(this.bookService, 'delete_book', {
      book_id: bookId,
      auth_token: req.headers.authorization,
    });
  }

  @Post('/:book_id/rate')
  async rate(
    @Param('book_id') book_id: string,
    @Body() body: BookRatingDto,
    @Req() req: any,
  ) {
    return callService(this.bookService, 'rate_book', {
      ...body,
      book_id,
      auth_token: req.headers.authorization,
    });
  }

  @Post('/:book_id/like')
  async like(@Param('book_id') book_id: string, @Req() req: any) {
    return callService(this.bookService, 'like_book', {
      book_id,
      auth_token: req.headers.authorization,
    });
  }

  // not exactly an optimal like algorithm or a good one for that matter
  @Post('/:book_id/update-availability')
  async updateAvailability(
    @Param('book_id') book_id: string,
    @Body() body: UpdateAvaialabilityDto,
    @Req() req: any,
  ) {
    return callService(this.bookService, 'update_book_availability', {
      ...body,
      book_id,
      auth_token: req.headers.authorization,
    });
  }
}

export default BookController;
