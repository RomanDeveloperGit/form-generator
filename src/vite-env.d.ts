/// <reference types="vite/client" />
/// <reference types="redux-persist" />

interface ImportMetaEnv extends Env {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
