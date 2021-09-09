import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@InputType()
class PublicationDto {
  @ApiProperty({
    description: 'Publication name',
    default: 'The Great Pharaoh Inc',
    required: true,
  })
  @IsString({ message: 'Please provide a valid name' })
  @IsOptional({ message: 'Name field cannot be empty' })
  @Field({ nullable: true })
  name: string;

  @ApiProperty({
    description: "Publication's city",
    default: 'Chicago',
    required: false,
  })
  @IsString({ message: 'Please provide a valid city' })
  @IsOptional()
  @Field({ nullable: true })
  city: string;

  @ApiProperty({
    description: "Publication's state",
    default: 'Illinois',
    required: false,
  })
  @IsString({ message: 'Please provide a valid state' })
  @IsOptional()
  @Field({ nullable: true })
  state: string;

  @ApiProperty({
    description: "Publication's country",
    default: 'Los estados unidos',
    required: false,
  })
  @IsString({ message: 'Please provide a valid country' })
  @IsOptional()
  @Field({ nullable: true })
  country: string;
}

export { PublicationDto };
