import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/db/client';
import { generateImageURL } from '@/lib/utils';
import { EventsList } from '@/components/events/upcoming-events-list';

export default async function Home() {
	const events = await db.query.events.findMany({
		columns: { id: true, name: true, venue: true },
		with: { images: true },
		orderBy: (events, { desc }) => [desc(events.date)],
		limit: 4
	});

	const formattedEvents = events.map((event) => ({
		...event,
		cover: generateImageURL(event.images?.at(0)?.objectKey)
	}));

	return (
		<main className="mb-12">
			<section id="hero" className="relative">
				<Image
					src="/images/hero.webp"
					alt="DJ Block"
					width={1920}
					height={1080}
					className="h-[80vh] w-full object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/50" />

				{/* Hero Content */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="mx-6 bg-black/60 p-8 text-center">
						<h1 className="text-balance text-4xl font-bold leading-10 tracking-widest text-white md:text-6xl">
							Turn Up the Beat: Discover & Share DJ Events
						</h1>
						<p className="my-8 px-10 text-lg text-white md:text-xl">
							Join the beat! Discover upcoming DJ events or promote your own. Connect,
							dance, and create unforgettable nights with our music community.
						</p>
						<Button asChild>
							<Link href="/events" className="font-semibold">
								View Events
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* SECTION: Featured Events */}
			<section id="featured-events">
				<div className="relative flex items-center py-5">
					<div className="flex-grow border-t border-gray-400"></div>
					<h2 className="mx-4 my-12 flex-shrink rounded-xl border-x border-gray-400 px-6 text-center text-3xl font-bold">
						Upcoming Events
					</h2>
					<div className="flex-grow border-t border-gray-400"></div>
				</div>

				<EventsList events={formattedEvents} />
			</section>
		</main>
	);
}
