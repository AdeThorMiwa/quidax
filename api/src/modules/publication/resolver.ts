import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { PUBLICATION_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Publication } from '@entities/object-types';
import { PublicationDto } from '@publication/dto';
import { callService } from '@utils/app';

@Resolver(() => Publication)
class PublicationResolver {
  constructor(
    @Inject(PUBLICATION_SERVICE)
    private readonly publicationService: ClientProxy,
  ) {}

  @Mutation(() => Publication)
  async create_publication(
    @Args('body') body: PublicationDto,
    @Context() context: any,
  ): Promise<Publication & { token: string }> {
    return callService(this.publicationService, 'create_publication', {
      ...body,
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => [Publication])
  publications(
    @Context() context: any,
    @Args('query') q?: string,
  ): Promise<Publication[]> {
    return callService(this.publicationService, 'read_publications', {
      ...JSON.parse(q || '{}'),
      auth_token: context.req.headers.authorization,
    });
  }

  @Query(() => Publication)
  async publication(
    @Args('publicationId') publicationId: string,
    @Context() context: any,
  ): Promise<Publication> {
    return await callService(this.publicationService, 'read_publication', {
      publication_id: publicationId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Publication)
  async update_publication(
    @Args('publicationId') publicationId: string,
    @Args('body') body: PublicationDto,
    @Context() context: any,
  ): Promise<Publication> {
    return callService(this.publicationService, 'patch_publication', {
      ...body,
      publication_id: publicationId,
      auth_token: context.req.headers.authorization,
    });
  }

  @Mutation(() => Publication)
  async delete_publication(
    @Args('publicationId') publicationId: string,
    @Context() context: any,
  ): Promise<Publication> {
    return callService(this.publicationService, 'delete_publication', {
      publication_id: publicationId,
      auth_token: context.req.headers.authorization,
    });
  }
}

export default PublicationResolver;
