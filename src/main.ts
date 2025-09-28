import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { buildSwagger } from '@modules';
import { corsConfigs } from './configs';
import { json, urlencoded } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = parseInt(process.env.PORT, 10);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { bodyParser: true },
  );

  buildSwagger(app);

  app.enableCors(corsConfigs);

  app.enable('trust proxy');

  app.setGlobalPrefix('/api');

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port);
  Logger.log('Service is running on port ' + process.env.PORT);
}
bootstrap();
