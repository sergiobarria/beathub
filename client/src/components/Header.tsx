import { useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { m, LazyMotion, domAnimation } from 'framer-motion';

import { navLinks } from '@/constants';

function BgPatternOne() {
  return (
    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg
        className={clsx(
          'relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg]',
          'sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
        )}
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fillOpacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f97316" />
            <stop offset={1} stopColor="#169CF9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function BgPatternTwo() {
  return (
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
      <svg
        className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
          fillOpacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f97316" />
            <stop offset={1} stopColor="#169CF9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function DesktopNavigation({
  openMobile,
}: {
  openMobile: (isOpen: boolean) => void;
}) {
  return (
    <nav
      className="flex items-center justify-between py-6 max-w-7xl mx-auto transition-colors duration-200"
      aria-label="Global"
    >
      <div className="relative flex lg:flex-1">
        <NextLink href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">logo</span>
          <NextImage
            src="https://res.cloudinary.com/sbarria-dev/image/upload/v1675566938/dj-block/assets/logo_willfp.png"
            alt="logo"
            width={175}
            height={50}
          />
        </NextLink>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          onClick={() => openMobile(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navLinks.map((item) => (
          <NextLink
            key={item.id}
            href={item.href}
            className="text-sm font-semibold leading-6 text-white transition-colors duration-200 hover:text-orange-500"
          >
            {item.label}
          </NextLink>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {/* TODO: route to login? */}
        <NextLink
          href="#"
          className="text-sm font-semibold leading-6 text-white hover:text-orange-500"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </NextLink>
      </div>
    </nav>
  );
}

function MobileNavigation({
  isOpen,
  openMobile,
}: {
  isOpen: boolean;
  openMobile: (isOpen: boolean) => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 5 }}
      className="z-10"
    >
      <Dialog as="div" open={isOpen} onClose={openMobile}>
        <BgPatternOne />
        <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-zinc-900 px-6 py-6 lg:hidden">
          <div className="flex items-center justify-between">
            <NextLink href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">logo</span>
              <NextImage
                src="/images/logo.png"
                alt="logo"
                width={175}
                height={32}
              />
            </NextLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => openMobile(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navLinks.map((item) => (
                  <NextLink
                    key={item.id}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                  >
                    {item.label}
                  </NextLink>
                ))}
              </div>
              <div className="py-6">
                <NextLink
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white hover:bg-gray-400/10"
                >
                  Log in
                </NextLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </m.div>
  );
}

function HeroContent({ title, text }: { title?: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {title || 'Discover the best DJ mixes and events in the world'}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          {text ||
            'Join us on the dancefloor and let the music take over, immerse yourself in the ultimate DJ experience.'}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NextLink
            href="#"
            className="rounded-md bg-orange-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
          >
            Get started
          </NextLink>
          <NextLink
            href="#"
            className="text-base font-semibold leading-7 text-white"
          >
            Learn more <span aria-hidden="true">→</span>
          </NextLink>
        </div>
      </div>
    </div>
  );
}

export function Header({
  image,
  heroTitle,
  heroText,
  showHero = true,
}: {
  image?: string;
  heroTitle?: string;
  heroText?: string;
  showHero?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden px-4 md:px-0',
        showHero ? 'bg-gray-900 h-screen' : ''
      )}
    >
      {showHero && (
        <NextImage
          priority
          src={
            image ||
            'https://res.cloudinary.com/sbarria-dev/image/upload/f_auto,q_auto,b_black,o_20/v1675562873/dj-block/assets/hero_fuwwov.jpg'
          }
          alt="hero"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
      )}
      {showHero && <BgPatternOne />}
      {showHero && <BgPatternTwo />}

      <DesktopNavigation openMobile={setMobileMenuOpen} />
      <MobileNavigation
        isOpen={mobileMenuOpen}
        openMobile={setMobileMenuOpen}
      />

      {showHero && <HeroContent title={heroTitle} text={heroText} />}
    </div>
  );
}
