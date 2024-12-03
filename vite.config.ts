import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import commonjs from 'vite-plugin-commonjs'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    commonjs(),
  ],
  ssr: {
    noExternal: ['react-bricks', 'react-bricks/frontend', 'react-dropzone'],
  },
  define: {
    'process.env': {
      ...process.env,
    },
  },
})
