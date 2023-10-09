import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}
  create(createAuthDto: CreateAuthDto): Promise<Auth> {
    return this.authRepository.save(createAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(condition: any): Promise<Auth> {
    return this.authRepository.findOne({ where: { email: condition } });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
