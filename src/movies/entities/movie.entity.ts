import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  contentRating: string;

  @Column()
  runtime: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  rating: number;

  @Column()
  poster: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  metascore: number;

  @Column()
  writer: string;

  @Column()
  stars: string;

  @Column()
  trailer: string;

  @Column({ nullable: true })
  movieId: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}
