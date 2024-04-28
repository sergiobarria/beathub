import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { NavLinks } from './nav-links';

export function AppHeader() {
	return (
		<header className="flex h-20 items-center justify-between">
			<div className="text-2xl font-bold">
				<Link href="/">
					Beat<span className="text-primary">Hub</span>
				</Link>
			</div>

			<nav className="flex items-center">
				<NavLinks />

				{/* TODO: Show this button only to authenticated users */}
				<Button asChild>
					<Link href="/events/add" className="flex cursor-pointer items-center">
						<PlusIcon className="mr-2 size-4" />
						Add New Event
					</Link>
				</Button>
			</nav>
		</header>
	);
}
