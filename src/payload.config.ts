// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Stories } from './collections/Stories'
import { Users } from './collections/Users'
import { Writers } from './collections/Writers'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins} from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { resendAdapter } from '@payloadcms/email-resend'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' – My App',
      icons: [
        { rel: 'icon', type: 'image/png', url: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', url: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', type: 'image/png', url: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', url: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', url: '/android-chrome-512x512.png' },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/payload/Logo#Logo',
        Icon: '/components/payload/Icon#Icon',
      },
    },
    user: Users.slug,
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL || '',
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: resendAdapter({
    defaultFromAddress: 'nicole.k@nicolepoetry.com',
    defaultFromName: 'Nicole. K',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  collections: [Pages, Stories, Media, Categories, Users, Writers],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,

    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged-in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
