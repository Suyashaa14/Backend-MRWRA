// src/comments/comment.entity.ts
import { Auth } from 'src/auth/entities/auth.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Auth, auth => auth.id)
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @ManyToOne(() => Movie, movie => movie.id)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;
}
