import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly mailerService: MailerService,
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

  async sendPasswordResetEmail(email: string) {
    try {
      const user = await this.authRepository.findOne({
        where: { email: email },
      });
      console.log(user);
      if (user) {
        const resetToken = this.generateResetToken();

        user.resetToken = resetToken;
        user.resetTokenExpires = new Date(Date.now() + 3600000);
        await this.authRepository.save(user);
        return resetToken;
      }
    } catch (error) {
      throw new HttpException(
        `Failed to send password reset email: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateResetToken() {
    const length = 32;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const user = await this.authRepository.findOne({
        where: { resetToken: token },
      });

      if (user && user.resetTokenExpires > new Date()) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await this.authRepository.save(user);
      } else {
        throw new HttpException(
          'Invalid or expired token',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Failed to reset password: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  sendMail(to: string, subject: string, text: string): any {
    const emailSent = this.mailerService.sendMail({
      to: to,
      from: 'suyashaa.vaidya@wolfmatrix.com',
      subject: subject,
      text: text,
      html: `<b>${text}</b>`,
    });
    if (emailSent) {
      return { message: 'success' };
    }
  }
}
