import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { AppLayout } from '@/layouts';
import { API_URL } from '@/config';
import type { Event } from '@/types';
import { EventList } from '@/components';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 10,
  };
};

export default function HomePage({ events }: { events: Event[] }) {
  console.log('events', events);
  return (
    <AppLayout title="Home | Find the hottest parties">
      <div className="max-w-7xl mx-auto my-16">
        <EventList title="Featured Events" events={events.slice(0, 3)} />
        <div className="flex items-center justify-center mt-6">
          <NextLink
            href="/events"
            className={clsx(
              'inline-flex items-center rounded-md border border-orange-500 px-3 py-2',
              'text-sm font-medium leading-4 text-white shadow-sm hover:bg-orange-500 focus:outline-none',
              'transition-all transform duration-300 ease-in-out hover:scale-105'
            )}
          >
            View All Events
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </NextLink>
        </div>
      </div>
    </AppLayout>
  );
}
