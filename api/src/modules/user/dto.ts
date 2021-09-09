import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@utils/decorators/match-validator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
class CreateUserDto {
  @ApiProperty({
    description: "User's fullname",
    default: 'John Doe',
  })
  @IsString({ message: 'Please provide a valid name' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  @Field({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Email address to use for registration: should be unique',
    default: 'johndoe@fakemail.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @Field()
  email: string;

  @ApiProperty({
    description:
      'A minimum of 8 character password to use for subsequent authentication',
    default: 'JohnDoe1.0',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @Field()
  password: string;

  @ApiProperty({
    description: 'Confirm the previously input password',
    default: 'JohnDoe1.0',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: 'Password not match' })
  @Field()
  password_confirm: string;
}

@InputType()
class AuthUserDto {
  @ApiProperty({
    description: 'Email address to use for registration: should be unique',
    default: 'johndoe@fakemail.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @Field()
  readonly email: string;

  @ApiProperty({
    description: 'Confirm the previously input password',
    default: 'JohnDoe1.0',
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  readonly password: string;
}

@InputType()
class UpdateUserDto {
  @ApiProperty({
    description: "User's fullname",
    default: 'John Doe',
    required: false,
  })
  @IsString({ message: 'Please provide a valid name' })
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Email address to use for registration: should be unique',
    default: 'johndoe@fakemail.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsOptional()
  @Field({ nullable: true })
  email: string;
}

export { CreateUserDto, AuthUserDto, UpdateUserDto };
