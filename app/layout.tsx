import type { Metadata } from 'next';
import { Quantico } from 'next/font/google';

import './globals.css';
import { AppHeader } from '@/components/site/app-header';
import { AppFooter } from '@/components/site/app-footer';

const quantico = Quantico({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
	title: 'Home | DJ Block',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={quantico.className}>
				<div className="container mx-auto flex h-full min-h-screen max-w-screen-2xl flex-col">
					<AppHeader />
					{children}
					<AppFooter />
				</div>
			</body>
		</html>
	);
}
