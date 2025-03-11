import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StringService } from '@shared/services/string.service';

export const MODULE_UPLOAD = {
  avatar: {
    path: './public/uploads/user/avatars',
    url: '/public/uploads/user/avatars/',
    ext: ['.jpg', '.jpeg', '.png'],
    limit: 1024 * 1024,
  },
  default: {
    path: './public/uploads',
    url: '/public/uploads/',
    ext: ['.png', '.jpg', '.jpeg'],
    limit: 1024 * 1024,
  },
};

const stringService = new StringService();

const uploadStorage = diskStorage({
  destination: (req, file, cb) => {
    const config = getUploadConfig(file.fieldname);
    fs.mkdirSync(config.path, { recursive: true });
    cb(null, config.path);
  },
  filename: (req, file, cb) => {
    cb(null, stringService.getFileName(file));
  },
});

function getUploadConfig(fieldname) {
  const config = MODULE_UPLOAD;
  if (config[fieldname] != undefined) {
    return config[fieldname];
  }
  return config['default'];
}

const uploadFileFilter = function fileFilter(req, file, cb) {
  console.log(file);
  const ext = extname(file.originalname);
  const config = getUploadConfig(file.fieldname);
  console.log(ext);
  console.log(config.ext.includes(ext));
  if (!config.ext.includes(ext)) {
    return cb(new BadRequestException('File extensions is not allowed'));
  }
  if (config.limit < file.size) {
    return cb(new BadRequestException('File is too big'));
  }
  cb(null, true);
};
export const uploadOptions = {
  storage: uploadStorage,
  fileFilter: uploadFileFilter,
  limits: { fileSize: 1024 * 1024 * 1024 },
};
