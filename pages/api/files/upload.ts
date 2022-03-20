import formidable from 'formidable';
import { writeFiles } from 'lib/fileController';
import { logToAdminPanel } from 'lib/logController';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data: formidable.Files = await new Promise(function (
      resolve,
      reject
    ) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve(files);
      });
    });

    const fileList = await writeFiles(data);
    logToAdminPanel({
      type: 'upload',
      message: `Uploaded file(s): ${Object.keys(data).join(', ')}`,
      color: 'lime',
    });
    res.status(200).json(fileList);
  } catch {
    res.status(500).json({});
  }
}
