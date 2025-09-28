import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { FileModule } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./env/.env', './env/.env.dev', './env/.env.production'],
      isGlobal: true,
      load: [configuration],
    }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
