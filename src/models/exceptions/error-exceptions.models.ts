import { HttpStatus } from '@nestjs/common';

export abstract class ErrorException extends Error {
  public code: string;

  public args?: Record<string, any>;

  public statusCode?: HttpStatus;

  constructor() {
    super();
  }
}
