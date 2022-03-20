import path from 'path';

export const dataPath = path.join(process.cwd(), 'data');
export const filesListPath = path.join(dataPath, 'files.json');
export const logsPath = path.join(dataPath, 'logs.json');

export const filesPath = path.join(dataPath, 'files');

export const publicPath = path.join(process.cwd(), 'public');
