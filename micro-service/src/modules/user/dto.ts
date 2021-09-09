import { USER_TYPE } from '.prisma/client';
import { Match } from '@utils/decorators/match-validator';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateUserDto {
  @IsString({ message: 'Please provide a valid name' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsEnum(USER_TYPE)
  @IsOptional()
  type?: USER_TYPE;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: 'Password not match' })
  password_confirm: string;
}

class AuthUserDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

class UpdateUserDto {
  @IsString({ message: 'Please provide a valid name' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsOptional()
  email: string;
}

export { CreateUserDto, AuthUserDto, UpdateUserDto };
