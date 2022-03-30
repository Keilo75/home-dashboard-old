import { isDev } from 'lib/isDev';
import { Commit } from 'models/commit';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs-extra';
import { deployScriptPath, mainPath } from 'models/paths';
import { fork } from 'child_process';

const getUrl = (dev: boolean) => {
  return `http://localhost:${dev ? 3000 : 80}/deploy.js`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send('');

  const url = getUrl(isDev());
  const response = await fetch(url);
  const file = await response.text();

  await fs.writeFile(deployScriptPath, file);

  //fork(deployScriptPath, { detached: true, cwd: mainPath });

  // process.exit(0);
}
