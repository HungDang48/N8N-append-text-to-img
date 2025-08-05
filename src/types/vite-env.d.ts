/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_DEBUG: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}