import NextImage from 'next/image';
import NextLink from 'next/link';
import clsx from 'clsx';

import type { Event } from '@/types';

const ListItem = ({ event }: { event: Event }) => {
  return (
    <article
      className={clsx(
        'flex flex-col items-center bg-zinc-800 border border-zinc-600 rounded-lg',
        'shadow md:flex-row md:max-w-5xl mx-auto'
      )}
    >
      <NextImage
        className="object-cover w-full rounded-t-lg md:max-w-xs md:rounded-none md:rounded-l-lg"
        src={event?.image}
        alt="event image"
        width={960}
        height={540}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {event?.name}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {event?.description}
        </p>
        <div className="inline-block ml-auto mt-6">
          <NextLink
            href={`/events/${event?.slug}`}
            className={clsx(
              'inline-flex items-center rounded-md border border-transparent bg-orange-600 px-3 py-2',
              'text-sm font-medium leading-4 text-white shadow-sm hover:bg-orange-700 focus:outline-none'
            )}
          >
            Event Details
          </NextLink>
        </div>
      </div>
    </article>
  );
};

export const EventList = ({
  events,
  title,
}: {
  events: Event[];
  title: string;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center md:text-4xl">
        {title}
      </h2>
      {events.length === 0 && (
        <h3 className="text-center">No events to show...</h3>
      )}

      <div className="mt-8 space-y-8">
        {events.map((event) => (
          <ListItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
