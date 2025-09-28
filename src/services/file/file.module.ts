import { Logger, Module } from '@nestjs/common';
import { FILE_SERVICE } from './tokens';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { APP_CONFIG_PROVIDER, AppConfig, AppConfigModule } from '../../modules';
import { diskStorage } from 'multer';
import { uuid } from '@utils';
import { FileFilterRegex } from './file.regex';
import { FileFilterException } from './exceptions';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: AppConfig) => ({
        storage: diskStorage({
          destination: config.storage.destination,
          filename: (req, file, cb) => {
            const exts = file.originalname.split('.');
            const ext = exts[exts.length - 1];
            const id = uuid();
            const name = id.concat('.').concat(ext.toLowerCase());

            Logger.log('destination', config.storage.destination);
            cb(null, name);
            return name;
          },
        }),
        limits: {
          fileSize: config.file.maxFileSize,
        },
        dest: config.storage.destination,
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(FileFilterRegex)) {
            callback(new Error(new FileFilterException().message), false);
            return new FileFilterException();
          }
          callback(null, true);
        },
      }),
      inject: [APP_CONFIG_PROVIDER],
      imports: [AppConfigModule],
    }),
  ],
  providers: [{ provide: FILE_SERVICE, useClass: FileService }],
  exports: [FILE_SERVICE],
  controllers: [FileController],
})
export class FileModule {}
