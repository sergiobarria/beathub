import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { AppLayout } from '@/layouts';
import { API_URL } from '@/config';
import type { Event } from '@/types';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((event: Event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  return {
    props: {
      event: events[0],
    },
    revalidate: 10,
  };
};

export default function EventPage({ event }: { event: Event }) {
  const formattedDate = `${event?.date} at ${event?.time}`;

  const deleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('delete');
  };

  const editEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('edit');
  };

  return (
    <AppLayout showHero={false}>
      <div className="max-w-7xl mx-auto my-16">
        <NextLink
          href="/events"
          className={clsx(
            'inline-flex items-center rounded-full border border-transparent',
            'bg-orange-500 p-2 text-white shadow-sm hover:bg-orange-600 focus:outline-none2',
            'hover:scale-105 transition-all transform duration-200'
          )}
        >
          <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
        </NextLink>
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs md:text-sm border-l-2 mb-6 pl-3">
            {formattedDate}
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className={clsx(
                'inline-flex items-center rounded-md border border-transparent bg-orange-500',
                'px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-orange-600',
                'hover:scale-105 transition-all transform duration-200',
                'text-sm md:text-sm'
              )}
            >
              Edit
              <PencilIcon className="ml-2 -mr-0.5 h-3 w-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={clsx(
                'inline-flex items-center rounded-md border border-orange-500',
                'px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-orange-500',
                'hover:scale-105 transition-all transform duration-200',
                'text-sm md:text-sm'
              )}
            >
              Delete
              <TrashIcon className="ml-2 -mr-0.5 h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="max-w-7xl mb-10">
          <NextImage
            className="h-[18rem] md:h-[24rem] lg:h-[32rem]"
            src={event?.image}
            width={1280}
            height={720}
            alt={event?.name}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl md:text-4xl">{event?.name}</h2>
          <p>
            <span className="font-semibold">Performers:</span>{' '}
            {event?.performers}
          </p>
          <p>
            <span className="font-semibold">Description: </span>
            {event?.description}
          </p>
          <p>
            <span className="font-semibold">Venue: </span>
            {event?.venue}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
