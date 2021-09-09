import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
} from 'class-validator';

class TokenDto {
  @IsString()
  @IsOptional()
  auth_token?: string;
}

class CreateBookDto extends TokenDto {
  @IsString({ message: 'Please provide a valid book cover image' })
  @IsNotEmpty({ message: 'Cover field cannot be empty' })
  cover_image: string;

  @IsString({ message: 'Please provide a valid book title' })
  @IsNotEmpty({ message: 'Title field cannot be empty' })
  title: string;

  @IsInt({ message: 'Please provide a number of available book copies' })
  @IsNotEmpty()
  availability: number;

  @IsString({ message: 'Please provide a valid release date' })
  @IsNotEmpty()
  release_date: string;

  @IsString({ message: 'Please provide a valid genre', each: true })
  @IsArray()
  genre: string[];

  @IsString({ message: 'Please provide a valid tag', each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @IsString({ message: 'Please provide a valid synopsis' })
  @IsNotEmpty()
  synopsis: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Please provide a valid price' },
  )
  @IsNotEmpty()
  price: number;
}

class BookRatingDto extends TokenDto {
  @IsUUID('all', { message: 'Please provide a valid book ID' })
  @IsNotEmpty({ message: 'Book ID field cannot be empty' })
  book_id: string;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'Please provide a valid rating' },
  )
  @IsNotEmpty()
  @Max(5)
  rating: number;
}

class LikeBookDto extends TokenDto {
  @IsUUID('all', { message: 'Please provide a valid book ID' })
  @IsNotEmpty({ message: 'Book ID field cannot be empty' })
  book_id: string;
}

class UpdateAvaialabilityDto extends TokenDto {
  @IsUUID('all', { message: 'Please provide a valid book ID' })
  @IsNotEmpty({ message: 'Book ID field cannot be empty' })
  book_id: string;

  @IsInt({
    message: 'Please provide a valid number of total available copies',
  })
  @IsNotEmpty({ message: 'total field cannot be empty' })
  total: number;

  @IsInt({
    message: 'Please provide a valid number of sold available copies',
  })
  @IsNotEmpty({ message: 'sold field cannot be empty' })
  sold: number;
}

export {
  CreateBookDto,
  TokenDto,
  BookRatingDto,
  LikeBookDto,
  UpdateAvaialabilityDto,
};
