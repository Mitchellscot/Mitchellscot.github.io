import Layout from '../../components/Layout/Layout';

export default function AboutLayout({children}: {children: React.ReactNode}) {
  return <Layout path={'about'}>{children}</Layout>;
}
