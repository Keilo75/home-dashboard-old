// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from 'formidable';
import { writeFiles } from 'lib/files/fileController';
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

    res.status(200).json(fileList);
  } catch {
    res.status(500).json({});
  }
}
