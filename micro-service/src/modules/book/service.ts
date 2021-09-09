import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import {
  BookRatingDto,
  CreateBookDto,
  LikeBookDto,
  UpdateAvaialabilityDto,
} from '@book/dto';
import BookRepository from '@book/repository';
import QueryBuilder from '@utils/querybuilder';
import { retrieveTokenValue } from '@utils/jwt';
import { PUBLICATION_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@Injectable()
class BookService {
  private logger: Logger = new Logger(BookService.name);
  constructor(
    private bookRepository: BookRepository,
    @Inject(PUBLICATION_SERVICE)
    private readonly publicationService: ClientProxy,
  ) {}

  async createBook(data: CreateBookDto): Promise<Book> {
    try {
      // get writer
      this.logger.log(data.auth_token, `Get writer from auth token`);
      const writerId = await this.getUserIDFromToken(data.auth_token);

      // get writer's publication if exist
      const publication = await callService(
        this.publicationService,
        'read_writer_publication',
        {
          writer_id: writerId,
          auth_token: data.auth_token,
        },
      );
      this.logger.log(publication, "Writer's publication");

      // create availability
      this.logger.log('Creating avaialability', 'Availability');
      const avaialability = await this.bookRepository.createAvailability(
        data.availability,
      );
      this.logger.log(avaialability, 'Availability created');

      // format book data
      const bookData = {
        cover_image: data.cover_image,
        title: data.title,
        availability: { connect: { uid: avaialability.uid } },
        writer: { connect: { uid: writerId } },
        release_date: data.release_date,
        genre: data.genre,
        tags: data.tags,
        publication: { connect: { uid: publication.uid } },
        synopsis: data.synopsis,
        price: data.price,
      };
      this.logger.log(JSON.stringify(bookData), 'Book Data');

      // create new book with data
      const book = await this.bookRepository.create(bookData);
      this.logger.log(book, 'New Book');

      return book;
    } catch (e) {
      this.logger.error(e.message, 'Error creating book');

      throw new BadRequestException(e.message);
    }
  }

  async getAllBooks(q: any): Promise<Book[]> {
    this.logger.log(JSON.stringify(q), 'Input Query Parameter');

    try {
      const builder = new QueryBuilder(q);
      const query = builder.build(['filter', 'paginate', 'select', 'sort']);

      this.logger.log(JSON.stringify(query), 'Builder Query');

      return await this.bookRepository.getAll(query);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching books');

      throw new BadRequestException(e.message);
    }
  }

  async getBook(bookId: string): Promise<Book> {
    this.logger.log(bookId, 'Book ID');

    try {
      return await this.bookRepository.getById(bookId);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching book');

      throw new BadRequestException(e.message);
    }
  }

  async updateBook(
    bookId: string,
    body: Record<string, unknown>,
  ): Promise<Book> {
    this.logger.log(bookId, 'Book ID');

    try {
      return await this.bookRepository.updateById(bookId, body);
    } catch (e) {
      this.logger.error(e.message, 'Error updating book');

      throw new BadRequestException(e.message);
    }
  }

  async deleteBook(bookId: string): Promise<Book> {
    this.logger.log(bookId, 'Book ID');

    try {
      return await this.bookRepository.deleteById(bookId);
    } catch (e) {
      this.logger.error(e.message, 'Error deleting book');

      throw new BadRequestException(e.message);
    }
  }

  async rate({ book_id, rating, auth_token }: BookRatingDto) {
    this.logger.log(book_id, 'Book ID');
    try {
      // get user id from token
      this.logger.log(auth_token, 'Get user id from auth token');
      const userId = await this.getUserIDFromToken(auth_token);
      this.logger.log(userId, 'User ID');

      // create a new rating
      this.logger.log(rating, 'Creating rating');
      await this.bookRepository.createRating(userId, book_id, rating);

      // get new aggregate rating of book
      this.logger.log('Aggregating rating');
      const newAggregateRating =
        await this.bookRepository.getBookAggregateRating(book_id);
      this.logger.log(newAggregateRating, 'New Aggregate');

      // update book's current average rating
      const book = await this.bookRepository.updateById(book_id, {
        average_ratings: parseInt(Number(newAggregateRating).toFixed(1)),
      });
      this.logger.log(book);

      return book;
    } catch (e) {
      this.logger.error(e.message, 'Error rating book');

      throw new BadRequestException(e.message);
    }
  }

  async like({ book_id }: LikeBookDto) {
    this.logger.log(book_id, 'Book ID');
    try {
      // update book's current like
      const book = await this.bookRepository.updateById(book_id, {
        like_count: { increment: 1 },
      });

      return book;
    } catch (e) {
      this.logger.error(e.message, 'Error liking book');

      throw new BadRequestException(e.message);
    }
  }

  async updateAvailability({ book_id, total, sold }: UpdateAvaialabilityDto) {
    this.logger.log(book_id, 'Book ID');
    try {
      // get book
      const book = await this.bookRepository.getById(book_id);
      this.logger.log(book, 'Book');

      //update availability
      const avaialability = await this.bookRepository.updateAvailability(
        book.availability_id,
        { total, sold },
      );

      return { ...book, avaialability };
    } catch (e) {
      this.logger.error(e.message, 'Error updating  book availability');

      throw new BadRequestException(e.message);
    }
  }

  private async getUserIDFromToken(token: string) {
    this.logger.log(token, `Get writer from auth token`);
    token = token.split('Bearer')[1].trim();
    return (await retrieveTokenValue<{ id: string }>(token)).id;
  }
}

export default BookService;
