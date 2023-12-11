import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useLoaderData,
} from '@remix-run/react'
import type { MetaFunction } from '@remix-run/node'
import { ReactBricks } from 'react-bricks/frontend'
import config from './react-bricks/config'

import styles from './css/style.css'
import ErrorMessage from './components/ErrorMessage'
import { useState } from 'react'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
  return { title: 'Remix Blog Starter with React Bricks' }
}

export const loader = () => {
  const apiKey = process.env.API_KEY
  const appId = process.env.APP_ID
  const environment = process.env.PUBLIC_ENVIRONMENT

  if (!apiKey || !appId) {
    throw new Error('Missing React Bricks credentials in .env file')
  }

  return { appId, apiKey, environment }
}

export default function App() {
  const navigate = useNavigate()
  const { appId, apiKey, environment } = useLoaderData()

  const savedColorMode =
    typeof window === 'undefined' ? '' : localStorage.getItem('color-mode')
  const [colorMode, setColorMode] = useState(savedColorMode || 'light')

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorMode(newColorMode)
    localStorage.setItem('color-mode', newColorMode)
  }

  const reactBricksConfig = {
    ...config,
    appId,
    apiKey,
    environment,
    navigate: (path: string) => navigate(path),
    isDarkColorMode: colorMode === 'dark',
    toggleColorMode,
    contentClassName: `${colorMode} ${
      colorMode === 'dark' ? 'dark darkContentClass' : 'light whiteContentClass'
    }`,
  }

  const clientThemeCode = `
  ;(() => {
    const theme = localStorage.getItem('color-mode') || "light"
    const cl = document.documentElement.classList;
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');

    if (!themeAlreadyApplied) {
      cl.add(theme);
    }
  })();
  `

  return (
    <html lang="en" className={savedColorMode ?? 'light'}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body id="root">
        <ReactBricks {...reactBricksConfig}>
          <Outlet />
        </ReactBricks>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorMessage error={error} />
        <Scripts />
      </body>
    </html>
  )
}
