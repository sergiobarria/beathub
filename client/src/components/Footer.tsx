import NextLink from 'next/link';

import { navLinks } from '@/constants';

export const Footer = () => {
  return (
    <footer className="mt-16 px-4 md:px-0">
      <div className="mx-auto border-t border-zinc-700 max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navLinks.map((link) => (
            <NextLink
              key={link.id}
              href={link.href}
              className="hover:text-orange-500 transition-colors duration-300"
            >
              {link.label}
            </NextLink>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Dj Block, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
