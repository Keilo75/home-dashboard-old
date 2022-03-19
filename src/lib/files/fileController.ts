import fs from 'fs-extra';
import path from 'path';
import { File, dataDir } from 'src/models/file';

export const getFiles = async (): Promise<File[]> => {
  const files = await fs.readJSON(path.join(dataDir, 'files.json'));
  return files;
};
