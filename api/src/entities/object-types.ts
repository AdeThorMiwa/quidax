import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  token: string;
}

@ObjectType()
export class User extends Token {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uid: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class Publication {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uid: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
class Avaialable {
  @Field()
  sold: number;

  @Field()
  total: number;
}

@ObjectType()
export class Book {
  @Field()
  id: number;

  @Field()
  uid: string;

  @Field()
  cover_image: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  availability_id?: string;

  @Field(() => Avaialable, { nullable: true })
  avaialability?: Avaialable;

  @Field()
  writer_id: string;

  @Field()
  release_date: string;

  @Field(() => [String])
  genre: string[];

  @Field(() => [String])
  tags: string[];

  @Field()
  average_ratings: number;

  @Field()
  like_count: number;

  @Field({ nullable: true })
  publication_id?: string;

  @Field()
  synopsis: string;

  @Field()
  price: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class Cart {
  @Field()
  id: number;
  @Field()
  uid: string;
  @Field()
  user_id: string;
  @Field()
  name: string;
  @Field()
  is_active: boolean;
  @Field()
  items_count: number;
  @Field()
  sub_total: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
