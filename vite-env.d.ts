/// <reference types="vite/client" />

/**
 * Build-time configuration.
 *
 * Only ever public values. Vite inlines these into the shipped bundle, so a
 * secret placed here would be published to every visitor — API keys live in the
 * Cloudflare Worker instead (see worker/README.md).
 */
interface ImportMetaEnv {
  /** Base URL of the threat-intelligence worker, e.g. https://sts-api.<you>.workers.dev */
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
