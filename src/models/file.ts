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

export interface File {
  name: string;
  size: number;
  id: string;
  timestamp: number;
}
