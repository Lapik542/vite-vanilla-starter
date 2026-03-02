import { resolve, dirname } from 'path'
import { readdirSync, statSync, existsSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BASE_URL = 'https://mycompany.com'
const IGNORED  = ['node_modules', 'dist', 'src', '.git', '.claude', 'public']

function getPages() {
  const pages = { main: resolve(__dirname, 'index.html') }

  readdirSync(__dirname).forEach(dir => {
    if (IGNORED.includes(dir)) return
    const dirPath = resolve(__dirname, dir)
    if (!statSync(dirPath).isDirectory()) return
    const htmlPath = resolve(dirPath, 'index.html')
    if (existsSync(htmlPath)) pages[dir] = htmlPath
  })

  return pages
}

const trailingSlashPlugin = {
  name: 'trailing-slash',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0]
      if (!url.endsWith('/') && !url.includes('.') && !url.startsWith('/@')) {
        res.writeHead(301, { Location: req.url.replace(url, url + '/') })
        res.end()
        return
      }
      next()
    })
  }
}

function sitemapPlugin() {
  return {
    name: 'sitemap',
    closeBundle() {
      const PRIORITY = { main: '1.0', services: '0.9', portfolio: '0.8', about: '0.7', contact: '0.6', terms: '0.3' }
      const pages = getPages()
      const urls = Object.keys(pages).map(key => {
        const path     = key === 'main' ? '/' : `/${key}/`
        const lastmod  = statSync(pages[key]).mtime.toISOString().split('T')[0]
        const priority = PRIORITY[key] ?? '0.5'
        return `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
      })
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls.join('\n') + '\n' +
        `</urlset>`
      writeFileSync(resolve(__dirname, 'dist/sitemap.xml'), xml)
    }
  }
}

export default defineConfig({
  plugins: [trailingSlashPlugin, sitemapPlugin()],
  build: {
    rollupOptions: {
      input: getPages()
    }
  }
})
