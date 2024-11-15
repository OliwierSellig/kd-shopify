// import react from '@astrojs/react';
// import sitemap from '@astrojs/sitemap';
// import vercel from '@astrojs/vercel/serverless';
// import { defineConfig } from 'astro/config';
// import redirects from './redirects';
// import { DOMAIN } from './src/global/constants';
// import { isPreviewDeployment } from './src/utils/is-preview-deployment';

// export default defineConfig({
//   site: DOMAIN,
//   integrations: [sitemap(), react()],
//   image: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'cdn.sanity.io',
//       },
//     ],
//   },
//   prefetch: {
//     prefetchAll: true,
//   },
//   redirects: redirects,
//   output: isPreviewDeployment ? 'server' : 'hybrid',
//   adapter: vercel(),
//   vite: {
//     ssr: {
//       noExternal: ['*'],
//     },
//     vite: {
//       build: {
//         modulePreload: false,
//       },
//     },
//   },
// });

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react()],
  output: 'server', // or 'hybrid' depending on your needs
  adapter: vercel(),
});
