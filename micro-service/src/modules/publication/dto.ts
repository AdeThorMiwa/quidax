import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class TokenDto {
  @IsString()
  @IsOptional()
  auth_token?: string;
}

class PublicationDto extends TokenDto {
  @IsString({ message: 'Please provide a valid name' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;

  @IsString({ message: 'Please provide a valid city' })
  @IsOptional()
  city: string;

  @IsString({ message: 'Please provide a valid state' })
  @IsOptional()
  state: string;

  @IsString({ message: 'Please provide a valid country' })
  @IsOptional()
  country: string;
}

export { PublicationDto, TokenDto };
