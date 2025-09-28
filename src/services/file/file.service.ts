import { APP_CONFIG_PROVIDER, AppConfig } from '@/modules';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { unlink } from 'fs';

@Injectable()
export class FileService {
  constructor(
    @Inject(APP_CONFIG_PROVIDER)
    private readonly config: AppConfig,
  ) {}

  upload(file: Express.Multer.File) {
    return {
      file,
    };
  }

  async delete(filename: string) {
    await unlink(`${this.config.storage.path}/${filename}`, () => {
      Logger.error('Delete failed:', filename);
    });
  }
}
