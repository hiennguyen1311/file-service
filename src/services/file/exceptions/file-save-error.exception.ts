import { APIErrorException } from '@commons';

export class FileSaveErrorException extends APIErrorException {
  get message() {
    return 'File saving failure';
  }
}
