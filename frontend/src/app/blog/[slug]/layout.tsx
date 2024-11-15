import Layout from '../../../components/Layout/Layout';

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout path={'blog'}>{children}</Layout>;
}
