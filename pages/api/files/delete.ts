import { deleteFile } from 'lib/fileController';
import { logToAdminPanel } from 'lib/logController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = req.query.id as string;
  const [fileList, name] = await deleteFile(file);
  logToAdminPanel({
    type: 'delete',
    message: `Deleted file: ${name}`,
    color: 'red',
  });
  res.status(200).json(fileList);
}
