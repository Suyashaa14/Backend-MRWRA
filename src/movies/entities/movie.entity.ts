import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

export enum SuperAdminApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  title_url: string;

  @Column()
  year: string;

  @Column()
  runtime: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  rating: string;

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

  @Column({ nullable: true })
  votes: string;

  @Column({ nullable: true })
  language: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: SuperAdminApprovalStatus,
    default: SuperAdminApprovalStatus.PENDING,
  })
  super_admin_approved: SuperAdminApprovalStatus;
}
