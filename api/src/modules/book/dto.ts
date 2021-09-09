import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@InputType()
class CreateBookDto {
  @ApiProperty({
    description: 'Book cover name',
    default: 'book-url.jpg',
    required: true,
  })
  @Field()
  @IsString({ message: 'Please provide a valid book cover image' })
  @IsNotEmpty({ message: 'Cover field cannot be empty' })
  cover_image: string;

  @ApiProperty({
    description: 'Book title',
    default: "Hitchhiker's guide to the galaxy",
    required: true,
  })
  @Field()
  @IsString({ message: 'Please provide a valid book title' })
  @IsNotEmpty({ message: 'Title field cannot be empty' })
  title: string;

  @ApiProperty({
    description: 'Number of available copies',
    default: 100,
    required: true,
  })
  @Field()
  @IsInt({ message: 'Please provide a number of available book copies' })
  @IsNotEmpty()
  availability: number;

  @ApiProperty({
    description: 'Book release date',
    default: new Date(),
    required: false,
  })
  @Field({ nullable: true })
  @IsString({ message: 'Please provide a valid release date' })
  @IsOptional()
  release_date: string;

  @ApiProperty({
    description: 'Book genre',
    default: ['sci-fi', 'horror'],
    required: true,
  })
  @Field(() => [String], { nullable: true })
  @IsString({ message: 'Please provide a valid genre', each: true })
  @IsArray()
  genre: string[];

  @ApiProperty({
    description: 'Additional tags',
    default: ['sci-fi', 'adapted'],
    required: false,
  })
  @Field(() => [String], { nullable: true })
  @IsString({ message: 'Please provide a valid tag', each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Book synopsis',
    default:
      'The hitchhikers guide to the galaxy is not a book for the faint of heart... Arthur dent is a... blah blah',
    required: true,
  })
  @Field()
  @IsString({ message: 'Please provide a valid synopsis' })
  @IsNotEmpty()
  synopsis: string;

  @ApiProperty({
    description: 'Book price',
    default: 1000.9,
    required: true,
  })
  @Field()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Please provide a valid price' },
  )
  @IsNotEmpty()
  price: number;
}

@InputType()
class UpdateBookDto {
  @ApiProperty({
    description: 'Book cover name',
    default: 'book-url.jpg',
    required: false,
  })
  @Field({ nullable: true })
  @IsString()
  @IsOptional({ message: 'Cover field cannot be empty' })
  cover_image: string;

  @ApiProperty({
    description: 'Book title',
    default: "Hitchhiker's guide to the galaxy",
    required: false,
  })
  @Field({ nullable: true })
  @IsString({ message: 'Please provide a valid book title' })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Number of available copies',
    default: 100,
    required: false,
  })
  @Field({ nullable: true })
  @IsInt({ message: 'Please provide a number of available book copies' })
  @IsOptional()
  availability: number;

  @ApiProperty({
    description: 'Book release date',
    default: new Date(),
    required: false,
  })
  @Field({ nullable: true })
  @IsDate({ message: 'Please provide a valid release date' })
  @IsOptional()
  release_date: Date;

  @ApiProperty({
    description: 'Book genre',
    default: ['sci-fi', 'horror'],
    required: false,
  })
  @Field(() => [String], { nullable: true })
  @IsString({ message: 'Please provide a valid genre', each: true })
  @IsArray()
  @IsOptional()
  genre: string[];

  @ApiProperty({
    description: 'Additional tags',
    default: ['sci-fi', 'adapted'],
    required: false,
  })
  @Field(() => [String], { nullable: true })
  @IsString({ message: 'Please provide a valid tag', each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Book synopsis',
    default:
      'The hitchhikers guide to the galaxy is not a book for the faint of heart... Arthur dent is a... blah blah',
    required: false,
  })
  @Field({ nullable: true })
  @IsString({ message: 'Please provide a valid synopsis' })
  @IsOptional()
  synopsis: string;

  @ApiProperty({
    description: 'Book price',
    default: 1000.9,
    required: false,
  })
  @Field({ nullable: true })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Please provide a valid price' },
  )
  @IsOptional()
  price: number;
}

@InputType()
class BookRatingDto {
  @ApiProperty({
    description: 'Rating value',
    default: 4.5,
    required: true,
  })
  @Field({ nullable: false })
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'Please provide a valid rating' },
  )
  @IsNotEmpty()
  @Max(5)
  @Min(0.5)
  rating: number;
}

@InputType()
class UpdateAvaialabilityDto {
  @ApiProperty({
    description: 'Total number of available copies',
    default: 100,
    required: true,
  })
  @Field({ nullable: false })
  @IsInt({
    message: 'Please provide a valid number of total available copies',
  })
  @IsNotEmpty({ message: 'total field cannot be empty' })
  total: number;

  @ApiProperty({
    description: 'Total number of sold copies',
    default: 60,
    required: true,
  })
  @Field({ nullable: false })
  @IsInt({
    message: 'Please provide a valid number of sold available copies',
  })
  @IsNotEmpty({ message: 'sold field cannot be empty' })
  sold: number;
}

export { CreateBookDto, UpdateBookDto, BookRatingDto, UpdateAvaialabilityDto };
