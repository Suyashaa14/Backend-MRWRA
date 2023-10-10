import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    if (!createAuthDto.role) {
      createAuthDto.role = 'user';
    }
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 12);
    createAuthDto.password = hashedPassword;
    const user = this.authService.create(createAuthDto);
    delete (await user).password;
    return user;
  }

  @Post('login')
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findOne(createAuthDto.email);

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(createAuthDto.password, user.password))) {
      throw new BadRequestException('Invalid Credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
      username: user.firstName + ' ' + user.lastName,
      email: user.email,
    });

    response.cookie('jwt ', jwt, { httpOnly: true });
    return {
      token: jwt,
    };
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
