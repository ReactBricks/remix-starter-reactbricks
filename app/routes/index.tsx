import type { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useContext } from 'react'
import { cleanPage, fetchPage, PageViewer, ReactBricksContext } from 'react-bricks/frontend'
import ErrorMessage from '~/components/ErrorMessage'
import Layout from '~/components/Layout'

export const loader = async () => {
  const HOME_PAGE = 'home'
  try {
    const page = await fetchPage(HOME_PAGE, process.env.API_KEY as string)
    return { page }
  } catch {
    throw new Error(`Cannot find the "${HOME_PAGE}" page.`)
  }
}

const Page = () => {
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

export const meta: MetaFunction = () => {
  return {
    title: 'React Bricks Blog',
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Layout>
      <ErrorMessage error={error} />
    </Layout>
  )
}

export default Page
