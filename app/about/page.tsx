import Image from 'next/image';

export default function AboutPage() {
	return (
		<main className="flex flex-col-reverse gap-8 py-8 lg:flex-row lg:px-10 lg:py-16">
			<article className="prose mx-auto text-pretty text-foreground/80 lg:w-3/5">
				<h1 className="mb-6 text-xl font-semibold text-foreground/80">Our Story</h1>
				<p>
					Founded in 2020 by a trio of music enthusiasts, BeatHub started as a small idea
					in a bustling city café. Frustrated by missing out on incredible DJ events
					around town due to scattered information, we envisioned a single platform where
					DJs and fans could come together. Our goal was simple: to create a space that
					not only promotes and tracks DJ events but also builds a community that thrives
					on the love of music.
				</p>

				<p>
					From our humble beginnings, BeatHub has grown into a premier destination for DJ
					event discovery and promotion. Initially launched in Los Angeles, the platform
					quickly gained popularity, expanding to support communities across the United
					States and, eventually, worldwide. Today, BeatHub hosts thousands of listings
					and attracts music enthusiasts eager to find their next great event.
				</p>

				<p>
					Our mission extends beyond listing events. We are dedicated to fostering a
					vibrant community where users can share experiences, tips, and music. BeatHub is
					also committed to supporting up-and-coming DJs by providing them with the
					visibility needed to reach broader audiences.
				</p>

				<p>
					As we look to the future, BeatHub remains passionate about enhancing user
					experiences and expanding our reach. We believe every night out is an
					opportunity to make memories, and every beat dropped is a chance to bring us
					closer. Join us on this journey, and let’s make every moment count.
				</p>
			</article>
			<div className="mb-10 lg:mb-0 lg:w-2/5">
				<div className="relative mt-16">
					<Image
						src="/images/about.png"
						alt="about"
						width={500}
						height={500}
						className="ml-6 w-[80%] -rotate-6 object-cover shadow-lg shadow-gray-300 grayscale"
					/>
				</div>
			</div>
		</main>
	);
}
