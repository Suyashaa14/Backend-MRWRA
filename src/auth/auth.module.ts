import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.zoho.com',
        auth: {
          user: 'suyashaa.vaidya@wolfmatrix.com',
          pass: 'Suy@sh@@123',
        },
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
