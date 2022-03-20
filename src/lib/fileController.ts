import formidable from 'formidable';
import fs from 'fs-extra';
import { filesListPath, filesPath } from 'models/paths';
import path from 'path';
import { File } from 'src/models/file';
import { v4 as uuid } from 'uuid';

export const getFiles = async (): Promise<File[]> => {
  const files = await fs.readJSON(filesListPath);
  return files;
};

export const addFiles = async (newFiles: File[]): Promise<File[]> => {
  const files: File[] = await fs.readJSON(filesListPath);
  const fileList = [...files, ...newFiles];
  await fs.writeJSON(filesListPath, fileList);

  return fileList;
};

export const deleteFile = async (id: string): Promise<[File[], string]> => {
  const files = await getFiles();
  const file = files.find((file) => file.id === id);

  const newFiles = files.filter((file) => file.id !== id);
  await fs.unlink(path.join(filesPath, file.name));

  await fs.writeJSON(filesListPath, newFiles);
  return [newFiles, file.name];
};

export const writeFiles = async (files: formidable.Files): Promise<File[]> => {
  const fileNames = Object.keys(files);
  const newFiles: File[] = [];

  for (const fileName of fileNames) {
    const file = files[fileName] as formidable.File;
    const rawData = fs.readFileSync(file.filepath);

    fs.writeFileSync(path.join(filesPath, fileName), rawData);
    newFiles.push({
      id: uuid(),
      name: fileName,
      size: file.size,
      timestamp: Date.now(),
    });
  }

  const fileList = await addFiles(newFiles);
  return fileList;
};
