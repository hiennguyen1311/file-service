import { UploadedFile } from '@nestjs/common';
import { filePipe } from './file-validator';

export const FileValidator = UploadedFile(filePipe);
