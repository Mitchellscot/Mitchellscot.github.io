import Layout from '../../components/Layout/Layout';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Workout Statistics',
  description: "Mitchell Scott's Workout Statistics",
};

export default function StatsLayout({children}: {children: React.ReactNode}) {
  return <Layout path={'stats'}>{children}</Layout>;
}
