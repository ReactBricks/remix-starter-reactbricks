import { useContext } from 'react'
import {
  ReactBricksContext,
  PageViewer,
  fetchPage,
  cleanPage,
} from 'react-bricks/frontend'
import { useLoaderData } from 'remix'
import type { MetaFunction } from 'remix'
import Layout from '~/components/Layout'
import ErrorMessage from '~/components/ErrorMessage'

export const loader = async ({ params }: { params: { slug: string } }) => {
  try {
    const page = await fetchPage(params.slug, process.env.API_KEY as string)
    return { page }
  } catch {
    throw new Error(`Cannot find the "${params.slug}" page.`)
  }
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.page?.meta?.title || 'Blog post',
  }
}

export default function Page() {
  const { page } = useLoaderData()
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <Layout>
      <PageViewer page={pageOk} />
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
