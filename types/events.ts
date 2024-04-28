import { Event } from '@/lib/schemas';
import { Image } from '@/lib/schemas';

export type EventWithCover = Event & { cover: string };
