/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ENVIRONMENT: string;
  readonly DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
