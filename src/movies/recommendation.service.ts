import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getRecommendations(movieId: any) {
    console.log('id', movieId);
    const selectedMovie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    const allMovies = await this.movieRepository.find();

    const movieSimilarities = await this.calculateMovieSimilarities(
      selectedMovie,
      allMovies,
    );

    const recommendations = this.recommendMovies(allMovies, movieSimilarities);

    return recommendations;
  }

  calculateMovieSimilarities(selectedMovie: Movie, allMovies: Movie[]) {
    return allMovies.map((movie) => {
      const similarity = this.calculateSimilarity(selectedMovie, movie);

      return { movieId: movie.id, similarity };
    });
  }

  calculateSimilarity(movie1: Movie, movie2: Movie) {
    return (
      movie1.genre === movie2.genre &&
      movie1.stars === movie2.stars &&
      movie1.director === movie2.director &&
      movie1.language === movie2.language
    );
  }

  recommendMovies(allMovies: Movie[], movieSimilarities: any[]) {
    const recommendations = allMovies.filter((movie) => {
      const isRecommended = movieSimilarities.some(
        (movieSimilarity) => movieSimilarity.movieId === movie.id,
      );

      return isRecommended;
    });

    return recommendations;
  }
}
