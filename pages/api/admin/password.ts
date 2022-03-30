import { logToAdminPanel } from 'lib/logController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const password = 'dashboard';

  if (req.query.p === password) {
    await logToAdminPanel({
      type: 'admin',
      message: 'Admin login detected.',
      color: 'blue',
    });
    res.status(200).send('OK');
  } else {
    res.status(401).send('Wrong');
  }
}
