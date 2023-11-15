import { IsString, IsNumber, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { Status } from '../entities/movie.entity';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  title_url: string;

  @IsString()
  year: string;

  @IsString()
  runtime: string;

  @IsString()
  description: string;

  @IsString()
  rating: string;

  @IsUrl()
  poster: string;

  @IsString()
  genre: string;

  @IsString()
  director: string;

  @IsString()
  stars: string;

  @IsUrl()
  trailer: string;

  @IsString()
  votes: string;

  @IsString()
  language: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
