import type { PropsWithChildren } from 'react';
import Head from 'next/head';

import { Header, Footer } from '@/components';

interface AppLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  heroImg?: string;
  heroTitle?: string;
  heroText?: string;
  showHero?: boolean;
}

export const AppLayout = ({
  children,
  title,
  description,
  keywords,
  heroImg,
  heroTitle,
  heroText,
  showHero,
}: PropsWithChildren<AppLayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header
        image={heroImg}
        heroTitle={heroTitle}
        heroText={heroText}
        showHero={showHero}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

AppLayout.defaultProps = {
  title: 'DJ Block | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
};
