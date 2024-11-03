import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RequestModule } from './request/request.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import {RequestEntity} from './request/entities/request.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, RoleModule, RequestModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // Cambia esto según la configuración de tu base de datos
      port: 5432,
      username: 'postgres', // Tu usuario de PostgreSQL
      password: 'postgres', // Tu contraseña de PostgreSQL
      database: 'urb', // El nombre de tu base de datos
      entities: [User, Role, RequestEntity],
      synchronize: true,        // Solo en desarrollo: sincroniza automáticamente los cambios en las entidades con la base de datos
      autoLoadEntities:true,
      logging:true

    }),
    TypeOrmModule.forFeature([User, Role, RequestEntity]),
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
