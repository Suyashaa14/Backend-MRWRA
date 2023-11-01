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
  title_url: string;

  @Column()
  year: number;

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
  stars: string;

  @Column()
  trailer: string;

  @Column()
  votes: number;

  @Column()
  language: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}
