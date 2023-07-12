import { ConfigEnv, defineConfig } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { resolve } from 'path'
import autoImport from 'unplugin-auto-import/vite'
import dotenv from 'dotenv'

import { accessSync, readFileSync } from 'fs'

const getPublicBase = () => {
  let base = process.env.PUBLIC_HOST_BASE ?? '/'
  base = base.charAt(0) != '/' ? `/${base}` : base
  if (base.charAt(base.length - 1) != '/') {
    base = base + '/'
  }
  return base
}

const getApiBase = (url: string) => {
  if (url == null) {
    return 'localhost'
  }
  const portIndex = url.lastIndexOf(':')
  return portIndex > 0 ? url.substring(0, portIndex) : url
}

const getEnvFile = (mode: string) => {
  if (mode != '' && mode !== 'production') {
    try {
      /// check if mode file exists.
      const file = `.env.${mode}`
      accessSync(file)
      return file
    } catch (err) {
      //
    }
  }
  return '.env'
}

// https://vitejs.dev/config/
export default async function ({ mode }: ConfigEnv) {
  const isProduction = mode === 'production'

  console.log(`running in mode: ${mode}`)
  dotenv.config({ path: getEnvFile(mode) })

  const api_base = getApiBase(process.env.VITE_API_BASE as string)

  let securityPolicies = [
    "default-src 'self'",
    "connect-src 'self' " + [api_base].join(' '),
    "font-src 'self' data:",
    isProduction
      ? "style-src 'self'"
      : "style-src 'self' 'unsafe-inline' 'unsafe-eval'",
  ]

  const publicBasePath = getPublicBase()
  console.log(`Deploying to base: ${publicBasePath}`)

  return defineConfig({
    base: publicBasePath,
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${resolve(__dirname, './src')}/` },
        {
          find: /^assets\//,
          replacement: `${resolve(__dirname, './assets')}/`,
        },
      ],
    },

    plugins: [
      react(),
      tsconfigPaths(),
      basicSsl(),
      createHtmlPlugin({
        inject: {
          data: {
            contentSecurityPolicy: securityPolicies.join('; '),
          },
        },
      }),
      // auto-import listed packages
      autoImport({
        dts: resolve(__dirname, 'src/auto-imports.d.ts'),
        imports: ['vue'],
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
  })
}
