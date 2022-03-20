import { getFile } from 'lib/fileController';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise(async (resolve) => {
    const id = req.query.id as string;
    const [readStream, name] = await getFile(id);

    res.setHeader('content-type', 'application/unknown');
    res.setHeader('content-disposition', 'attachment; filename=' + name);

    readStream.pipe(res);
    readStream.on('end', resolve);
  });
}
