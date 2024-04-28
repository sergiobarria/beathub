'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
	{ id: 0, label: 'Events', to: '/events', exact: false },
	{ id: 1, label: 'About', to: '/about', exact: false },
	{ id: 2, label: 'Contact Us', to: '/contact', exact: false }
];

export function NavLinks() {
	const pathname = usePathname();

	return (
		<div className="mr-12 flex items-center gap-6">
			{LINKS.map((link) => (
				<Link
					key={link.id}
					href={link.to}
					className={cn('px-2 text-sm', {
						'border-b-2 border-primary py-1.5 font-semibold': pathname === link.to,
						'font-thin text-muted-foreground hover:text-primary': pathname !== link.to
					})}
				>
					{link.label}
				</Link>
			))}
		</div>
	);
}
