/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEMETRY_MODE?: "sample" | "api";
  readonly VITE_TELEMETRY_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css";
