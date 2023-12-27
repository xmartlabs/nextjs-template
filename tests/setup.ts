import { loadEnvConfig } from '@next/env'

// NOTE: this is needed since Vite loads environment variables on
// `import.meta.env` while Next loads them on `process.env`.
const setup = async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}

export default setup();
