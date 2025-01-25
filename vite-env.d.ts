/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECTID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_SENDERID: string;
  readonly VITE_APPID: string;
  readonly VITE_MEASUREMENTID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
