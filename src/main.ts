import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import { RoleSeeder } from './seeders/role.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({limit:"10mb"}))
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  );

  const roleSeeder = app.get(RoleSeeder);
  await roleSeeder.seed()
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
