import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const filePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: Number(process.env.MAX_FILE_SIZE) }),
    new FileTypeValidator({ fileType: '([^\\s]+(\\.(?i)(jpe?g|png))$)' }),
  ],
});
