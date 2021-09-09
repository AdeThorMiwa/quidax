import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Publication } from '@prisma/client';
import { PublicationDto } from '@publication/dto';
import PublicationRepository from '@publication/repository';
import QueryBuilder from '@utils/querybuilder';

@Injectable()
class PublicationService {
  private logger: Logger = new Logger(PublicationService.name);
  constructor(private publicationRepository: PublicationRepository) {}

  async createPublication(data: PublicationDto): Promise<Publication> {
    // create new publication with data
    try {
      const publication = await this.publicationRepository.create(data);
      this.logger.log(publication, 'New Publication');

      return publication;
    } catch (e) {
      this.logger.error(e.message, 'Error creating publication');

      throw new BadRequestException(e.message);
    }
  }

  async getAllPublications(q: any): Promise<Publication[]> {
    this.logger.log(JSON.stringify(q), 'Input Query Parameter');

    try {
      const builder = new QueryBuilder(q);
      const query = builder.build(['filter', 'paginate', 'select', 'sort']);

      this.logger.log(JSON.stringify(query), 'Builder Query');

      return await this.publicationRepository.getAll(query);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching publications');

      throw new BadRequestException(e.message);
    }
  }

  async getPublication(publicationId: string): Promise<Publication> {
    this.logger.log(publicationId, 'Publication ID');

    try {
      return await this.publicationRepository.getById(publicationId);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching publication');

      throw new BadRequestException(e.message);
    }
  }

  async getWriterPublication(writerId: string): Promise<Publication> {
    this.logger.log(writerId, 'Writer ID');

    try {
      const publication =
        await this.publicationRepository.getWhereIncludeWriter(writerId);
      if (!publication)
        throw new RpcException('Writer not belong to any publication');

      return publication;
    } catch (e) {
      this.logger.error(e.message, 'Error fetching publication');

      throw new BadRequestException(e.message);
    }
  }

  async updatePublication(
    publicationId: string,
    body: Record<string, unknown>,
  ): Promise<Publication> {
    this.logger.log(publicationId, 'Publication ID');

    try {
      return await this.publicationRepository.updateById(publicationId, body);
    } catch (e) {
      this.logger.error(e.message, 'Error updating publication');

      throw new BadRequestException(e.message);
    }
  }

  async updatePublicationWriters(
    publicationId: string,
    writerId: string,
  ): Promise<Publication> {
    this.logger.log({ publicationId, writerId }, 'Publication & Writer IDs');

    try {
      return await this.publicationRepository.addWriterToPublication(
        publicationId,
        writerId,
      );
    } catch (e) {
      this.logger.error(e.message, 'Error adding writer to publication');

      throw new BadRequestException(e.message);
    }
  }

  async deletePublication(publicationId: string): Promise<Publication> {
    this.logger.log(publicationId, 'Publication ID');

    try {
      return await this.publicationRepository.deleteById(publicationId);
    } catch (e) {
      this.logger.error(e.message, 'Error deleting publication');

      throw new BadRequestException(e.message);
    }
  }
}

export default PublicationService;
