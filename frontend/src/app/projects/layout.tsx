import Layout from "../../components/Layout/Layout"

export default function ProjectsLayout({ children, }: { children: React.ReactNode }) {
    return <Layout path={'projects'}>{children}</Layout>
}