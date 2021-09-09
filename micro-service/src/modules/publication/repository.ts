import PrismaService from '@services/prisma';
import { Prisma, Publication } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
class PublicationRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PublicationCreateInput): Promise<Publication> {
    return this.prisma.publication.create({ data });
  }

  async getAll(builderResult = {}): Promise<Publication[]> {
    return this.prisma.publication.findMany({ ...builderResult });
  }

  async getById(uid: string): Promise<Publication> {
    const publication = await this.prisma.publication.findFirst({
      where: { uid },
    });
    if (!publication)
      throw new NotFoundException('No publication found with this email');
    return publication;
  }

  async getWhereIncludeWriter(writerId: string) {
    return this.prisma.publication.findFirst({
      where: { writer_ids: { has: writerId } },
    });
  }

  async updateById(
    uid: string,
    data: Prisma.PublicationUpdateInput,
  ): Promise<Publication> {
    await this.getById(uid);
    return this.prisma.publication.update({ where: { uid }, data });
  }

  async addWriterToPublication(publicationId: string, writerId: string) {
    await this.getById(publicationId);
    return this.prisma.publication.update({
      where: { uid: publicationId },
      data: {
        writer_ids: { push: writerId },
      },
    });
  }

  async deleteById(uid: string): Promise<Publication> {
    await this.getById(uid);
    return this.prisma.publication.delete({ where: { uid } });
  }
}

export default PublicationRepository;
