import Layout from '../../components/Layout/Layout';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Workout Statistics',
  description: "Mitchell Scott's Workout Statistics",
};
import {Suspense} from 'react';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default function StatsLayout({children}: {children: React.ReactNode}) {
  return (
    <Suspense fallback={<LoadingIndicator isFullScreen={true} />}>
      <Layout path={'stats'}>{children}</Layout>
    </Suspense>
  );
}
