import { ErrorException } from '@models';

export class APIErrorException extends ErrorException {
  get message() {
    return 'API Error Exception';
  }
}
