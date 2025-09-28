import { isNil } from 'lodash';
import { AppConfig } from './app-config.interface';
import { storageFolder } from '@utils';

export class AppConfigService implements AppConfig {
  private static privateInstance?: AppConfig;

  public static get instance(): AppConfig {
    if (!AppConfigService.privateInstance) {
      AppConfigService.privateInstance = new AppConfigService();
    }

    return AppConfigService.privateInstance;
  }

  private getNumber(key: string) {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    return this.getString(key).toLowerCase() === 'true';
  }

  private getString(key: string): string {
    const value = this.get(key);
    return value.replaceAll('\\n', '\n');
  }

  private get(key: string): string {
    const value = process.env[key];

    if (isNil(value)) {
      throw new Error(key + ': Variable is not set');
    }

    return value;
  }

  get app() {
    return {
      isProduction: this.getBoolean('IS_PRODUCTION'),
    };
  }

  get file() {
    return {
      maxFileSize: this.getNumber('MAX_FILE_SIZE'),
    };
  }

  get storage() {
    return {
      path: this.getString('STORAGE_PATH'),
      url: this.getString('STORAGE_URL'),
      folder: this.getString('STORAGE_FOLDER'),
      destination: this.getBoolean('IS_PRODUCTION')
        ? this.getString('STORAGE_PATH')
        : storageFolder,
    };
  }
}
