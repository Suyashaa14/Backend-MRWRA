import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie, Status } from './entities/movie.entity';
import { Comment } from './entities/comments.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: any) {
    return this.movieRepository.findOne({ where: { id } });
  }

  private movieHasSelectedGenres(
    movie: Movie,
    selectedGenres: string[],
  ): boolean {
    const movieGenres = movie.genre.split(',').map((genre) => genre.trim());

    return selectedGenres.some((selectedGenre) =>
      movieGenres.includes(selectedGenre),
    );
  }
  async filterByGenres(selectedGenres: string[]): Promise<Movie[]> {
    const allMovies = await this.movieRepository.find();

    const filteredMovies = allMovies.filter((movie) =>
      this.movieHasSelectedGenres(movie, selectedGenres),
    );

    return filteredMovies;
  }
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    // Update the movie entity with the values from the DTO
    Object.assign(movie, updateMovieDto);

    // Save the updated movie entity
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID #${id} not found`);
    }

    movie.status = Status.DELETED;
    await this.movieRepository.save(movie);

    return movie;
  }

  async createComment(movieId: number, data: { comment: string, userId: Auth }){
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });

    if (!movie) {
      throw new Error('Movie not found');
    }
    const newComment = new Comment();
    newComment.comment = data.comment;
    newComment.movie = movie;
    newComment.user = data.userId;
    return this.commentRepository.save(newComment);
  }

  async getComments(movieId: number) {
    const comments = await this.commentRepository.find({
      where: { movie: { id: movieId } },
      relations: ['user'],
    });
  
    // Transform the result to exclude the 'password' field from the user object
    const transformedComments = comments.map(comment => ({
      id: comment.id,
      comment: comment.comment,
      user: {
        id: comment.user.id,
        firstName: comment.user.firstName,
        lastName: comment.user.lastName,
        email: comment.user.email,
        role: comment.user.role,
        resetToken: comment.user.resetToken,
        resetTokenExpires: comment.user.resetTokenExpires,
      },
    }));
  
    return transformedComments;
  }
  
}
