// Fetches the integration registry (metadata + documentation) from S3 and
// materializes it under docs/integrations as static MDX pages, so the
// Docusaurus build always reflects whatever mcp-express-connectors last
// published via scripts/generate_registry.py.
//
// Run before `docusaurus start`/`build` (wired as npm "pre" hooks).

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.join(__dirname, '..')
const DOCS_INTEGRATIONS_DIR = path.join(REPO_ROOT, 'docs', 'integrations')

// CI/shell-provided env vars always win over .env file contents.
dotenv.config({ path: path.join(REPO_ROOT, '.env') })

function getRequiredEnv(name, fallback) {
  const value = process.env[name] ?? fallback
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }
  return res.text()
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url))
}

async function clearGeneratedIntegrationDocs() {
  const entries = await fs.readdir(DOCS_INTEGRATIONS_DIR, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === '_category_.json') continue
    const target = path.join(DOCS_INTEGRATIONS_DIR, entry.name)
    await fs.rm(target, { recursive: true, force: true })
  }
}

async function writeIntegrationDoc(integration, position) {
  const { slug, name, documentation } = integration

  if (!documentation) {
    console.warn(`[fetch-integrations] Skipping '${slug}': no documentation URL`)
    return
  }

  let content
  try {
    content = await fetchText(documentation)
  } catch (err) {
    console.warn(`[fetch-integrations] Skipping '${slug}': ${err.message}`)
    return
  }

  const integrationDir = path.join(DOCS_INTEGRATIONS_DIR, slug)
  await fs.mkdir(integrationDir, { recursive: true })

  const frontMatter = [
    '---',
    `sidebar_label: ${JSON.stringify(name)}`,
    '---',
    '',
  ].join('\n')
  await fs.writeFile(
    path.join(integrationDir, 'index.mdx'),
    frontMatter + content,
    'utf-8'
  )

  const category = {
    label: name,
    position,
    link: { type: 'doc', id: `integrations/${slug}/index` },
  }
  await fs.writeFile(
    path.join(integrationDir, '_category_.json'),
    JSON.stringify(category, null, 2) + '\n',
    'utf-8'
  )

  console.log(`[fetch-integrations] Wrote docs/integrations/${slug}`)
}

async function main() {
  const bucket = getRequiredEnv('INTEGRATIONS_S3_BUCKET')
  const region = getRequiredEnv('AWS_REGION', 'eu-central-1')
  const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`

  console.log('[fetch-integrations] Fetching integrations.json')
  const integrations = await fetchJson(`${baseUrl}/integrations/integrations.json`)

  await clearGeneratedIntegrationDocs()

  let position = 1
  for (const integration of integrations) {
    await writeIntegrationDoc(integration, position)
    position += 1
  }

  console.log(`[fetch-integrations] Done (${integrations.length} integrations)`)
}

main().catch(err => {
  console.error('[fetch-integrations] Failed:', err)
  process.exit(1)
})
