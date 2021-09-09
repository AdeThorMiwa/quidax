import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
class CreateCartDto {
  @ApiProperty({
    description: 'Cart name',
    default: 'My cart',
    required: true,
  })
  @Field({ nullable: false })
  @IsString({ message: 'Please provide a valid cart name' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;
}

@InputType()
class ItemToCartDto {
  @ApiProperty({
    description: 'Cart Id',
    default: 'j-30022-3kkkl3-399',
    required: true,
  })
  @Field({ nullable: false })
  @IsUUID('all', { message: 'Please provide a valid cart id' })
  @IsNotEmpty({ message: 'Cart ID cannot be empty' })
  cart_id: string;

  @ApiProperty({
    description: 'Book Id',
    default: '999-rrrr0333-39994-333',
    required: true,
  })
  @Field({ nullable: false })
  @IsUUID('all', { message: 'Please provide a valid book id' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  book_id: string;

  @ApiProperty({
    description: 'Item Cont',
    default: 4,
    required: true,
  })
  @Field({ nullable: false })
  @IsInt({ message: 'Please provide a valid integer item count value' })
  @IsNotEmpty({ message: 'Item count field cannot be empty' })
  item_count: number;
}

@InputType()
class RemoveItemToCartDto {
  @ApiProperty({
    description: 'Cart Id',
    default: 'ppp-3333-333-jjj',
    required: true,
  })
  @Field({ nullable: false })
  @IsUUID('all', { message: 'Please provide a valid cart id' })
  @IsNotEmpty({ message: 'Cart ID cannot be empty' })
  cart_id: string;

  @ApiProperty({
    description: 'Book Id',
    default: 'ooo-000-999-3333-222',
    required: true,
  })
  @Field({ nullable: false })
  @IsUUID('all', { message: 'Please provide a valid book id' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  book_id: string;
}
class UpdateCartItemDto {
  @ApiProperty({
    description: 'Book Id',
    default: '00-333-ggg-hhh-jjj',
    required: true,
  })
  @Field({ nullable: false })
  @IsUUID('all', { message: 'Please provide a valid book id' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  book_id: string;

  @ApiProperty({
    description: 'Item Count',
    default: 5,
    required: true,
  })
  @Field({ nullable: false })
  @IsInt({ message: 'Please provide a valid integer item count value' })
  @IsNotEmpty({ message: 'Item count field cannot be empty' })
  item_count: number;
}
export { CreateCartDto, ItemToCartDto, RemoveItemToCartDto, UpdateCartItemDto };
