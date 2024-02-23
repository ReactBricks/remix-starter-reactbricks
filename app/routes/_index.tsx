import { MetaFunction, useLoaderData, useRouteError } from '@remix-run/react'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  getSchemaOrgData,
  useReactBricksContext,
} from 'react-bricks/frontend'

import config from '~/react-bricks/config'
import ErrorMessage from '~/components/ErrorMessage'
import Layout from '~/components/Layout'

export const loader = async () => {
  const [page, header, footer] = await Promise.all([
    fetchPage(
      '/',
      process.env.API_KEY as string,
      undefined,
      config.pageTypes
    ).catch(() => {
      throw new Error(`Cannot find the home page.`)
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

  return {
    page,
    header,
    footer,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const meta = data?.page.meta
  const schemaOrgData = data?.page ? getSchemaOrgData(data?.page) : ''

  const seoData = []

  if (meta?.title) {
    seoData.push({ title: meta.title })
    seoData.push({ name: 'title', content: meta.title })
  }
  if (meta?.description)
    seoData.push({ name: 'description', content: meta?.description })
  if (meta?.keywords)
    seoData.push({ name: 'keywords', content: meta?.keywords })
  if (meta?.openGraph?.url)
    seoData.push({ property: 'og:url', content: meta?.openGraph?.url })
  if (meta?.openGraph?.type)
    seoData.push({ property: 'og:type', content: meta?.openGraph?.type })
  if (meta?.openGraph?.title)
    seoData.push({ property: 'og:title', content: meta?.openGraph?.title })
  if (meta?.openGraph?.description)
    seoData.push({
      property: 'og:description',
      content: meta?.openGraph?.description,
    })
  if (meta?.openGraph?.image?.src)
    seoData.push({ property: 'og:image', content: meta?.openGraph?.image?.src })
  if (meta?.twitterCard?.card)
    seoData.push({ property: 'twitter:card', content: meta?.twitterCard?.card })
  if (meta?.twitterCard?.site)
    seoData.push({ property: 'twitter:site', content: meta?.twitterCard?.site })
  if (meta?.twitterCard?.creator)
    seoData.push({
      property: 'twitter:creator',
      content: meta?.twitterCard?.creator,
    })
  if (meta?.twitterCard?.title)
    seoData.push({
      property: 'twitter:title',
      content: meta?.twitterCard?.title,
    })
  if (meta?.twitterCard?.description)
    seoData.push({
      property: 'twitter:description',
      content: meta?.twitterCard?.description,
    })
  if (meta?.twitterCard?.image?.src)
    seoData.push({
      property: 'twitter:image',
      content: meta?.twitterCard?.image?.src,
    })
  if (schemaOrgData)
    seoData.push({
      'script:ld+json': schemaOrgData ? JSON.parse(schemaOrgData) : '',
    })

  return [...seoData]
}

export default function Page() {
  const { page, header, footer } = useLoaderData<typeof loader>()
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useReactBricksContext()
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null

  return (
    <Layout>
      <PageViewer page={headerOk} />
      <PageViewer page={pageOk} main />
      <PageViewer page={footerOk} />
    </Layout>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  return (
    <Layout>
      <ErrorMessage error={error as Error} />
    </Layout>
  )
}
