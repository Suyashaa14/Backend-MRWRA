import { IsString, IsNumber, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { Status } from '../entities/movie.entity';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  title_url: string;

  @IsString()
  year: string;

  @IsString()
  runtime: string;

  @IsString()
  description: string;

  @IsNumber()
  rating: number;

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

  @IsNumber()
  votes: number;

  @IsString()
  language: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
