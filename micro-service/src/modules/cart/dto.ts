import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class TokenDto {
  @IsString()
  @IsOptional()
  auth_token?: string;
}

class CreateCartDto extends TokenDto {
  @IsString({ message: 'Please provide a valid cart name' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;
}

class ItemToCartDto extends TokenDto {
  @IsUUID('all', { message: 'Please provide a valid cart id' })
  @IsNotEmpty({ message: 'Cart ID cannot be empty' })
  cart_id: string;

  @IsUUID('all', { message: 'Please provide a valid book id' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  book_id: string;

  @IsInt({ message: 'Please provide a valid integer item count value' })
  @IsNotEmpty({ message: 'Item count field cannot be empty' })
  item_count: number;
}

class RemoveItemToCartDto extends TokenDto {
  @IsUUID('all', { message: 'Please provide a valid cart id' })
  @IsNotEmpty({ message: 'Cart ID cannot be empty' })
  cart_id: string;

  @IsUUID('all', { message: 'Please provide a valid book id' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  book_id: string;
}

class UpdateCartItemDto extends TokenDto {
  @IsUUID('all', { message: 'Please provide a valid book id' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  book_id: string;

  @IsUUID('all', { message: 'Please provide a valid cart id' })
  @IsNotEmpty({ message: 'Cart cannot be empty' })
  cart_id: string;

  @IsInt({ message: 'Please provide a valid integer item count value' })
  @IsNotEmpty({ message: 'Item count field cannot be empty' })
  item_count: number;
}

export {
  CreateCartDto,
  TokenDto,
  ItemToCartDto,
  RemoveItemToCartDto,
  UpdateCartItemDto,
};
