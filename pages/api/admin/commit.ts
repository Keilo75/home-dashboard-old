import { Commit } from 'models/commit';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(process.env.COMMIT_API);
  const body = await response.json();

  const commit: Commit = {
    author: body.commit.author.name,
    date: body.commit.author.date,
    message: body.commit.message,
    additions: body.stats.additions,
    deletions: body.stats.deletions,
  };

  res.status(200).json(commit);
}
