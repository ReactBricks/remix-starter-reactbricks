import {
  PageViewer,
  fetchPage,
  cleanPage,
  getSchemaOrgData,
  types,
} from 'react-bricks/frontend'
import { useReactBricksContext } from 'react-bricks/frontend'
import { useLoaderData } from '@remix-run/react'
import Layout from '~/components/Layout'
import ErrorMessage from '~/components/ErrorMessage'
import { redirect } from '@remix-run/node'
import type { LoaderArgs } from '@remix-run/node'
import { Helmet } from 'react-helmet'

export const loader = async ({ params }: LoaderArgs) => {
  const splat = params['*']

  const [page, header, footer] = await Promise.all([
    fetchPage(splat!, process.env.API_KEY as string).catch(() => {
      throw new Error(`Cannot find the "${splat}" page.`)
    }),
    fetchPage('header', process.env.API_KEY as string).catch(() => {
      throw new Error(
        `Cannot find header. Create a new 'header' entity under 'Layout'`
      )
    }),
    fetchPage('footer', process.env.API_KEY as string).catch(() => {
      throw new Error(
        `Cannot find footer. Create a new 'footer' entity under 'Layout'`
      )
    }),
  ])

  if (page.slug === 'header' || page.slug === 'footer') return redirect('/')

  return {
    page,
    header,
    footer,
  }
}

export default function Page() {
  const { page, header, footer } = useLoaderData<{
    page: types.Page
    header: types.Page
    footer: types.Page
  }>()
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useReactBricksContext()
  const pageOk =
    page && page.slug !== 'header' && page.slug !== 'footer'
      ? cleanPage(page, pageTypes, bricks)
      : null
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null

  const { meta } = page
  const schemaOrgData = getSchemaOrgData(page)

  return (
    <Layout>
      <Helmet>
        {meta.title && <title>{meta.title}</title>}
        {/* Meta tag */}
        {meta.title && <meta name="title" content={meta.title} />}
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        {/* OpenGraph */}
        {meta.openGraph?.url && (
          <meta property="og:url" content={meta.openGraph?.url} />
        )}
        {meta.openGraph?.type && (
          <meta property="og:type" content={meta.openGraph?.type} />
        )}
        {meta.openGraph?.title && (
          <meta property="og:title" content={meta.openGraph?.title} />
        )}
        {meta.openGraph?.description && (
          <meta
            property="og:description"
            content={meta.openGraph?.description}
          />
        )}
        {meta.openGraph?.image && (
          <meta property="og:image" content={meta.openGraph?.image.src} />
        )}
        {/* Twitter Card */}
        {meta.twitterCard?.card && (
          <meta name="twitter:card" content={meta.twitterCard?.card} />
        )}
        {meta.twitterCard?.site && (
          <meta name="twitter:site" content={meta.twitterCard?.site} />
        )}
        {meta.twitterCard?.creator && (
          <meta name="twitter:creator" content={meta.twitterCard?.creator} />
        )}
        {meta.twitterCard?.title && (
          <meta name="twitter:title" content={meta.twitterCard?.title} />
        )}
        {meta.twitterCard?.description && (
          <meta
            name="twitter:description"
            content={meta.twitterCard?.description}
          />
        )}
        {meta.twitterCard?.image && (
          <meta name="twitter:image" content={meta.twitterCard.image.src} />
        )}

        {schemaOrgData && (
          <script type="application/ld+json">{schemaOrgData}</script>
        )}
      </Helmet>
      <PageViewer page={headerOk} showClickToEdit={false} />
      <PageViewer page={pageOk} />
      <PageViewer page={footerOk} showClickToEdit={false} />
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
