import { GetStaticProps } from 'next';

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

export default function EventsPage({ events }: { events: Event[] }) {
  return (
    <AppLayout
      heroImg="https://res.cloudinary.com/sbarria-dev/image/upload/f_auto,q_auto,b_black,o_20/v1675571159/dj-block/assets/events_lye2re.jpg"
      heroTitle="See what's happening"
      heroText="Get ready to move to the beat,experience electrifying DJ events with us."
    >
      <div className="max-w-7xl mx-auto my-16">
        <EventList title="Events" events={events} />
      </div>
    </AppLayout>
  );
}
