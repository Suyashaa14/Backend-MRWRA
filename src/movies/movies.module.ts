import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { RecommendationService } from './recommendation.service';
import { Comment } from './entities/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie,Comment])],
  controllers: [MoviesController],
  providers: [MoviesService, RecommendationService],
})
export class MoviesModule {}
