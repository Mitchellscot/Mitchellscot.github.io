import Layout from "../../../components/Layout/Layout"

export default function TagsLayout({ children, }: { children: React.ReactNode }) {
    return <Layout path={'tags'}>{children}</Layout>
}