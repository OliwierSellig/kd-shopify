/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SANITY_API_TOKEN: string;
  readonly SHOPIFY_STOREFRONT_TOKEN: string;
  readonly SHOPIFY_STORE_URL: string;
  readonly CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
  readonly CUSTOMER_ACCOUNT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
