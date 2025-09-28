import {
  Body,
  Controller,
  Delete,
  Inject,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_SERVICE } from './tokens';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(
    @Inject(FILE_SERVICE)
    private readonly service: FileService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
    Logger.log(body, 'body');
    Logger.log(file, 'file');
    return this.service.upload(file);
  }

  @Delete(':filename')
  delete(@Param() params: { filename: string }) {
    return this.service.delete(params.filename);
  }
}
