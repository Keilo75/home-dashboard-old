import path from 'path';

export type FileType = 'image' | 'video' | 'text' | 'unknown';
const FileTypeRecord: Record<FileType, string[]> = {
  text: [],
  video: [],
  image: [],
  unknown: [],
};

export const getFileType = (format: string): FileType => {
  for (const key of Object.keys(FileTypeRecord)) {
    if (FileTypeRecord[key].includes(format)) return key as FileType;
  }

  return 'unknown';
};

export const maxFileSize = 524288000;
export const dataPath = path.join(process.cwd(), 'data');
export const filesPath = path.join(dataPath, 'files');
export const filesListPath = path.join(dataPath, 'files.json');

export const publicPath = path.join(process.cwd(), 'public');

export interface File {
  name: string;
  size: number;
  id: string;
}
