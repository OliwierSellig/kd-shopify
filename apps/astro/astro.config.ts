import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import redirects from './redirects';
import { DOMAIN } from './src/global/constants';
import { isPreviewDeployment } from './src/utils/is-preview-deployment';

export default defineConfig({
  site: DOMAIN,
  integrations: [sitemap(), react()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  prefetch: {
    prefetchAll: true,
  },
  redirects: redirects,
  output: isPreviewDeployment ? 'server' : 'hybrid',
  adapter: vercel(),
});
