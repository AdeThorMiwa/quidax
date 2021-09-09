import { Controller, UseGuards } from '@nestjs/common';
import PublicationService from '@publication/service';
import { PublicationDto } from '@publication/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import AuthGuard from '@guards/auth';

@Controller()
class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @MessagePattern('create_publication')
  @UseGuards(AuthGuard)
  async createPublication(@Payload() payload: PublicationDto) {
    delete payload.auth_token;
    return await this.publicationService.createPublication(payload);
  }

  @MessagePattern('read_publications')
  @UseGuards(AuthGuard)
  async getAllPublications(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.publicationService.getAllPublications(payload);
  }

  @MessagePattern('read_publication')
  @UseGuards(AuthGuard)
  async getPublication(@Payload() payload: { publication_id: string }) {
    return await this.publicationService.getPublication(payload.publication_id);
  }

  @MessagePattern('read_writer_publication')
  @UseGuards(AuthGuard)
  async getWriterPublication(@Payload() payload: { writer_id: string }) {
    return await this.publicationService.getWriterPublication(
      payload.writer_id,
    );
  }

  @MessagePattern('patch_publication')
  @UseGuards(AuthGuard)
  async updatePublication(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.publicationService.updatePublication(
      payload.publication_id,
      { ...payload, publication_id: undefined },
    );
  }

  @MessagePattern('patch_publication_writers')
  @UseGuards(AuthGuard)
  async updatePublicationWriters(
    @Payload()
    payload: {
      publication_id: string;
      writer_id: string;
      auth_token: string;
    },
  ) {
    delete payload.auth_token;
    return await this.publicationService.updatePublicationWriters(
      payload.publication_id,
      payload.writer_id,
    );
  }

  @MessagePattern('delete_publication')
  @UseGuards(AuthGuard)
  async deletePublication(@Payload() payload: { publication_id: string }) {
    return await this.publicationService.deletePublication(
      payload.publication_id,
    );
  }
}

export default PublicationController;
