import { useContext } from "react"
import {
  ReactBricksContext,
  PageViewer,
  fetchPage,
  cleanPage,
} from "react-bricks/frontend"
import { useLoaderData } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import Layout from "~/components/Layout"
import ErrorMessage from "~/components/ErrorMessage"

export const loader = async ({ params }: { params: any }) => {
  const splat = params["*"]

  const [page, header, footer] = await Promise.all([
    fetchPage(splat, process.env.API_KEY as string).catch(() => {
      throw new Error(`Cannot find the "${splat}" page.`)
    }),
    fetchPage("header", process.env.API_KEY as string).catch(() => {
      throw new Error(
        `Cannot find header. Create a new 'header' entity under 'Layout'`
      )
    }),
    fetchPage("footer", process.env.API_KEY as string).catch(() => {
      throw new Error(
        `Cannot find footer. Create a new 'footer' entity under 'Layout'`
      )
    }),
  ])

  return {
    page,
    header,
    footer,
  }
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.page?.meta?.title || "Blog post",
  }
}

export default function Page() {
  const { page, header, footer } = useLoaderData()
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null

  return (
    <Layout>
      <PageViewer page={headerOk} />
      <PageViewer page={pageOk} />
      <PageViewer page={footerOk} />
    </Layout>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Layout>
      <ErrorMessage error={error} />
    </Layout>
  )
}
