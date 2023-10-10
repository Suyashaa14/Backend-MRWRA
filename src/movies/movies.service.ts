import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie, Status } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: any) {
    return this.movieRepository.findOne({where: {id}});
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({where: {id}});

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    // Update the movie entity with the values from the DTO
    Object.assign(movie, updateMovieDto);

    // Save the updated movie entity
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({where: {id}});

    if (!movie) {
      throw new NotFoundException(`Movie with ID #${id} not found`);
    }

    movie.status = Status.DELETED;
    await this.movieRepository.save(movie);

    return movie;
  }
}
