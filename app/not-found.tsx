// pages/404.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LimeButton from '@/components/Button/limeButton';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
          <LimeButton name='Go Back' type='button' />
        </Link>

    </div>
  );
};

export default NotFoundPage;
