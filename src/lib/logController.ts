import { DefaultMantineColor } from '@mantine/core';
import fs from 'fs-extra';
import { logsPath } from 'models/paths';

export interface LogMessage {
  type: string;
  message: string;
  timestamp: number;
  color: DefaultMantineColor;
}

export const getLogs = async (): Promise<LogMessage[]> => {
  const files = await fs.readJSON(logsPath);
  return files;
};

export const logToAdminPanel = async (
  message: Omit<LogMessage, 'timestamp'>
): Promise<void> => {
  const logs: LogMessage[] = await fs.readJSON(logsPath);
  await fs.writeJSON(logsPath, [
    ...logs,
    { ...message, timestamp: Date.now() },
  ]);
};
