import NextImage from 'next/image';
import NextLink from 'next/link';

import { AppLayout } from '@/layouts';

export default function NotFound() {
  return (
    <AppLayout showHero={false}>
      <div className="flex min-h-full flex-col bg-transparent lg:relative mt-16">
        <div className="flex flex-grow flex-col">
          <main className="flex flex-grow flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8">
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-orange-600">404</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-200 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                  <NextLink
                    href="/"
                    className="text-base font-medium text-orange-600 hover:text-orange-500"
                  >
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </NextLink>
                </div>
              </div>
            </div>
          </main>
          <footer className="flex-shrink-0">
            <div className="mx-auto w-full max-w-7xl py-16 px-6 lg:px-8">
              <nav className="flex space-x-4">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Contact Support
                </a>
                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Status
                </a>
                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Twitter
                </a>
              </nav>
            </div>
          </footer>
        </div>
        <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
          <NextImage
            className="absolute inset-0 h-full w-full object-cover"
            src="https://res.cloudinary.com/sbarria-dev/image/upload/q_auto,f_auto/v1675572239/dj-block/assets/not-found-new_xl6y1q.jpg"
            alt="not found"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </AppLayout>
  );
}
