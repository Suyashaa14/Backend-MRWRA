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
          user: 'sabin.sunar@wolfmatrix.com',
          pass: 'S@1234ub!n',
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
