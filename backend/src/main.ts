import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './core/transform.interceptor';
import { JwtAuthGuard } from './modules/auth/passport/jwt-auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  const port = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  //config cors
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      credentials: true
    }
  );

  app.setGlobalPrefix('api/v1', { exclude: [''] })

  await app.listen(port, '0.0.0.0');
}
bootstrap();
