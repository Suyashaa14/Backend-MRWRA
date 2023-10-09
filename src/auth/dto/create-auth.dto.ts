import { IsString, IsEmail, Length, IsIn } from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateAuthDto {
  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @Length(1, 50)
  lastName: string;

  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(Object.values(UserRole))
  role: string;
}
