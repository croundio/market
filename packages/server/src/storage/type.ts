export type AppMimeType = 'image/png' | 'image/jpeg';

export type BufferedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
};
