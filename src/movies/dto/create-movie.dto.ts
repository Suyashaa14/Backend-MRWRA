import { IsString, IsNumber, IsEnum, IsOptional, IsUrl, IsBoolean } from 'class-validator';
import { Status, SuperAdminApprovalStatus } from '../entities/movie.entity';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  title_url: string;

  @IsString()
  year: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  votes: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsEnum(SuperAdminApprovalStatus)
  @IsOptional()
  super_admin_approved: SuperAdminApprovalStatus;
}
