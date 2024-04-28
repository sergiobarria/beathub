import Link from 'next/link';
import Image from 'next/image';

import { Event } from '@/lib/schemas';
import { Button } from '../ui/button';

type EventWithCover = Event & { cover: string };

interface EventsListProps {
	events: EventWithCover[];
}

export function EventsList({ events }: EventsListProps) {
	return (
		<ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{events.map((event) => (
				<div key={event.id} className="flex flex-col">
					<div className="group relative aspect-square overflow-hidden">
						<Image
							src={event.cover}
							alt="cover"
							fill
							sizes="(min-width: 640px) 50vw, 100vw"
							className="transform object-cover transition-transform duration-300 ease-in-out hover:scale-110"
						/>
						{/* Hidden content overlay (should show on hover from bottom) */}
						<div className="absolute bottom-0 z-10 w-full transform bg-black/70 p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
							<h3 className="text-lg font-semibold text-white">{event.name}</h3>
							<Button asChild size="sm">
								<Link href={`/events/${event.id}`} className="font-semibold">
									View Event
								</Link>
							</Button>
						</div>
					</div>
					<h3 className="text-lg font-semibold text-white">{event.venue}</h3>
				</div>
			))}
		</ul>
	);
}
