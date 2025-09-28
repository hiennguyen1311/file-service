import { APP_CONFIG_PROVIDER, AppConfig } from '@/modules';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { unlink } from 'fs';
import { FileSaveErrorException } from './exceptions';

@Injectable()
export class FileService {
  constructor(
    @Inject(APP_CONFIG_PROVIDER)
    private readonly config: AppConfig,
  ) {}

  upload(file: Express.Multer.File) {
    if (file) {
      return Object.assign(file, {
        url: `${this.config.storage.url}/${this.config.storage.folder}/${file.filename}`,
      });
    }

    throw new FileSaveErrorException();
  }

  async delete(filename: string) {
    await unlink(`${this.config.storage.path}/${filename}`, () => {
      Logger.error('Delete failed:', filename);
    });
  }
}
