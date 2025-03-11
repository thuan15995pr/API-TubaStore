export interface IFile {
  encoding: string;
  buffer: Buffer;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface IUploadConfig {
  path: string;
  url: string;
  ext: string[];
  limit: number;
}
