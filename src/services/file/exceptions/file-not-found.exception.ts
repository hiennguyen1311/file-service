import { APIErrorException } from '@commons';

export class FileNotFoundException extends APIErrorException {
  get message() {
    return 'File is not found';
  }
}
