import { Injectable } from '@nestjs/common';
import { MODULE_UPLOAD } from '@constants/file';
import { IUploadConfig } from '@interfaces/IFile';

@Injectable()
export class FilesService {
  getUploadConfig(fieldName: string): IUploadConfig {
    const config = MODULE_UPLOAD;
    if (config[fieldName] != undefined) {
      return config[fieldName];
    }
    return config['default'];
  }
}
