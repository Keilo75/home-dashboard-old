import path from 'path';

export const maxFileSize = 524288000;
export const dataDir = path.join(process.cwd(), 'data');

export interface File {
  name: string;
  size: number;
  id: string;
}
