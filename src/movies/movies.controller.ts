import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RecommendationService } from './recommendation.service';
import { Auth } from 'src/auth/entities/auth.entity';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly recommendationService: RecommendationService,
  ) {}

  @Post('create')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }
  @Get('filterByGenres')
  filterByGenres(@Query('genres') genres: string) {
    const selectedGenres = genres.split(',');

    return this.moviesService.filterByGenres(selectedGenres);
  }

  @Post(':id/comments')
  createComment(@Param('id') movieId: string, @Body() data: { comment: string, userId: Auth }) {
    return this.moviesService.createComment(+movieId, data);
  }
  
  @Get(':id/comments')
  getComments(@Param('id') movieId: string){
    return this.moviesService.getComments(+movieId);
  }

  // @Get('recommendations/:movieId')
  // getRecommendations(@Param('movieId') movieId: string) {
  //   return this.recommendationService.getRecommendations(movieId);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
