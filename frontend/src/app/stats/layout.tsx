import Layout from '../../components/Layout/Layout';

export default function StatsLayout({children}: {children: React.ReactNode}) {
  return <Layout path={'stats'}>{children}</Layout>;
}
