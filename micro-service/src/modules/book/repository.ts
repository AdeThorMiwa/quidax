import PrismaService from '@services/prisma';
import { Prisma, Book } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
class BookRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async createAvailability(numOfAvailability: number) {
    return this.prisma.availability.create({
      data: { total: numOfAvailability },
    });
  }

  async getAll(builderResult = {}): Promise<Book[]> {
    return this.prisma.book.findMany({ ...builderResult });
  }

  async getById(uid: string): Promise<Book> {
    const book = await this.prisma.book.findFirst({ where: { uid } });
    if (!book) throw new NotFoundException('No book found with this ID');
    return book;
  }

  async updateById(uid: string, data: Prisma.BookUpdateInput): Promise<Book> {
    await this.getById(uid);
    return this.prisma.book.update({ where: { uid }, data });
  }

  async updateAvailability(uid: string, data: Prisma.AvailabilityUpdateInput) {
    return this.prisma.availability.update({ where: { uid }, data });
  }

  async deleteById(uid: string): Promise<Book> {
    await this.getById(uid);
    return this.prisma.book.delete({ where: { uid } });
  }

  async createRating(user_id: string, book_id: string, rating: number) {
    await this.getById(book_id);
    return this.prisma.ratings.create({
      data: {
        book_id,
        user_id,
        rating,
      } as any,
    });
  }

  async getBookRatingsCount(book_id: string) {
    await this.getById(book_id);
    return this.prisma.ratings.count({ where: { book_id } });
  }

  async getBookAggregateRating(book_id: string) {
    await this.getById(book_id);
    return (
      await this.prisma.ratings.aggregate({
        _avg: {
          rating: true,
        },
      })
    )._avg.rating;
  }

  async getAvailability(uid: string) {
    const avaialability = await this.prisma.availability.findFirst({
      where: { uid },
    });
    if (!avaialability)
      throw new NotFoundException('No availability found with this ID');
    return avaialability;
  }
}

export default BookRepository;
