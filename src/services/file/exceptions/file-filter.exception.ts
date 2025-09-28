import { APIErrorException } from '@commons';

export class FileFilterException extends APIErrorException {
  get message() {
    return 'File type is not supported';
  }
}
