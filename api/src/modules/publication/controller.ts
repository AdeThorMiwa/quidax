import { PublicationDto } from '@publication/dto';
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
import { PUBLICATION_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@ApiTags('Publication')
@ApiBearerAuth('Authorization')
@Controller('/publications')
class PublicationController {
  constructor(
    @Inject(PUBLICATION_SERVICE)
    private readonly publicationService: ClientProxy,
  ) {}

  @Post('/')
  async newPublication(@Body() body: PublicationDto, @Req() req: any) {
    return callService(this.publicationService, 'create_publication', {
      ...body,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/')
  async getPublications(@Query() q: any, @Req() req: any) {
    return callService(this.publicationService, 'read_publications', {
      ...q,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/:publication_id')
  async getPublication(
    @Param('publication_id') publicationId: string,
    @Req() req: any,
  ) {
    return callService(this.publicationService, 'read_publication', {
      publication_id: publicationId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:publication_id')
  async updatePublication(
    @Param('publication_id') publicationId: string,
    @Body() body: PublicationDto,
    @Req() req: any,
  ) {
    return callService(this.publicationService, 'patch_publication', {
      ...body,
      publication_id: publicationId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:publication_id/new-writer/:writer_id')
  async addWriterToPublication(
    @Param('publication_id') publicationId: string,
    @Param('writer_id') writerId: string,
    @Req() req: any,
  ) {
    return callService(this.publicationService, 'patch_publication_writers', {
      publication_id: publicationId,
      writer_id: writerId,
      auth_token: req.headers.authorization,
    });
  }

  @Delete('/:publication_id')
  async deletePublication(
    @Param('publication_id') publicationId: string,
    @Req() req: any,
  ) {
    return callService(this.publicationService, 'delete_publication', {
      publication_id: publicationId,
      auth_token: req.headers.authorization,
    });
  }
}

export default PublicationController;
