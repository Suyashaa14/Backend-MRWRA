import { IsString, IsNumber, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { Status } from '../entities/movie.entity'; // Import the Status enum from your movie.entity file

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsString()
  contentRating: string;

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

  @IsNumber()
  metascore: number;

  @IsString()
  writer: string;

  @IsString()
  stars: string;

  @IsUrl()
  trailer: string;

  @IsString()
  movieId: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status; 
}
