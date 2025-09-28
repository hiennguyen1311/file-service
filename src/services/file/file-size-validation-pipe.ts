import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const mazFileSize = Number(process.env.MAX_FILE_SIZE);
    return value.size <= mazFileSize;
  }
}
