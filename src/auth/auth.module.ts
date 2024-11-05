import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        UserModule,
        RoleModule,
        ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'clavesecreta'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
      global: true,
    }),
    ],
    providers : [AuthService],
    controllers:[AuthController]
})
export class AuthModule {}
