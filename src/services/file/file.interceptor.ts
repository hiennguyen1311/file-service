import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

export const FileInterceptor = UseInterceptors(FilesInterceptor('files'));
