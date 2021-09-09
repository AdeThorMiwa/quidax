import { Module } from '@nestjs/common';
import UserModule from '@user/module';
import PublicationModule from '@publication/module';
import BookModule from '@book/module';

@Module({
  imports: [UserModule, PublicationModule, BookModule],
})
export default class Modules {}
