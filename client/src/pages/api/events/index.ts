import type { NextApiRequest, NextApiResponse } from 'next';

import type { Event, Error } from '@/types';
import { events } from '../../../data/data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[] | Error>
) {
  if (req.method === 'GET') {
    res.status(200).json(events);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
