import type { NextApiRequest, NextApiResponse } from 'next';

import type { Event, Error } from '@/types';
import { events } from '../../../data/data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[] | Error>
) {
  const { slug } = req.query;
  const evt = events.filter((ev) => ev.slug === slug);

  if (req.method === 'GET') {
    res.status(200).json(evt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
