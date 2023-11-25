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
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 12);
    createAuthDto.password = hashedPassword;
    const user = this.authService.create(createAuthDto);
    delete (await user).password;
    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findOne(email);

    if (!user) {
      throw new BadRequestException('Username DOesnt Exist');
    }

    if (!(await bcrypt.compare(password, user.password))) {
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

  @Post('password-reset')
  async requestPasswordReset(@Body() body: { email: string }) {
    const resetToken = await this.authService.sendPasswordResetEmail(
      body.email,
    );
    const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
    const emailSubject = 'Password Reset';
    const emailBody = `Click the following link to reset your password: ${resetLink}`;
    this.authService.sendMail(body.email, emailSubject, emailBody);
    return { message: 'Password reset email sent successfully' };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: { password: string },
  ) {
    await this.authService.resetPassword(token, body.password);
    return { message: 'Password reset successfully' };
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
