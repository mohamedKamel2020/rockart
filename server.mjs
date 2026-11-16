import http from 'node:http';
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseRoute } from './js/routing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.txt', '.xml']);
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function sendFileWithRange(req, res, filePath, statusCode = 200) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const total = stats.size;
    const range = req.headers.range;

    if (range && ext === '.mp4') {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (!match) {
        res.writeHead(416, { 'Content-Range': `bytes */${total}` });
        res.end();
        return;
      }

      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
      if (start > end || start >= total) {
        res.writeHead(416, { 'Content-Range': `bytes */${total}` });
        res.end();
        return;
      }

      const chunkSize = end - start + 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunkSize),
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        ...SECURITY_HEADERS,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    const headers = {
      ...SECURITY_HEADERS,
      'Content-Type': contentType,
      'Accept-Ranges': ext === '.mp4' ? 'bytes' : 'none',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    };

    if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      res.writeHead(statusCode, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
      fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
      return;
    }

    res.writeHead(statusCode, { ...headers, 'Content-Length': String(total) });
    fs.createReadStream(filePath).pipe(res);
  });
}

function sendNotFound(res) {
  const notFoundPath = path.join(ROOT_DIR, '404.html');
  fs.readFile(notFoundPath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    res.end(content);
  });
}

const PAGE_HTML_MAP = {
  home: 'index.html',
  about: 'about.html',
  'lock-stone': 'lock-stone.html',
  products: 'products.html',
  projects: 'projects.html',
  contact: 'contact.html',
};

const server = http.createServer((req, res) => {
  try {
    const reqUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    // Block path traversal outside workspace root
    const resolvedStatic = path.resolve(ROOT_DIR, `.${pathname}`);
    if (resolvedStatic !== ROOT_DIR && !resolvedStatic.startsWith(ROOT_DIR + path.sep)) {
      sendNotFound(res);
      return;
    }

    // Never expose project internals
    if (/^\/(node_modules|scripts|tests)\b|^\/(package(-lock)?\.json|server\.mjs|README\.md|\.[^/]+)$/.test(pathname)) {
      sendNotFound(res);
      return;
    }

    // This dev server cannot run PHP — never hand out the source; answer like a failed endpoint instead.
    if (pathname.endsWith('.php')) {
      res.writeHead(501, { 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS });
      res.end(JSON.stringify({ ok: false, error: 'PHP is not available on this dev server (use: php -S localhost:8000)' }));
      return;
    }

    // Direct file match (CSS, JS, images, videos, HTML) or a folder with its own index.html
    // (e.g. /products/SP-227/ → products/SP-227/index.html)
    if (pathname !== '/' && fs.existsSync(resolvedStatic)) {
      const stat = fs.statSync(resolvedStatic);
      if (stat.isFile()) {
        sendFileWithRange(req, res, resolvedStatic, pathname === '/404.html' ? 404 : 200);
        return;
      }
      const indexFile = path.join(resolvedStatic, 'index.html');
      if (stat.isDirectory() && fs.existsSync(indexFile)) {
        sendFileWithRange(req, res, indexFile, 200);
        return;
      }
    }

    // Route clean URLs (/about, /products, /contact, ...)
    const parsed = parseRoute(pathname);
    const htmlFile = PAGE_HTML_MAP[parsed.page];
    if (htmlFile) {
      sendFileWithRange(req, res, path.join(ROOT_DIR, htmlFile), 200);
      return;
    }

    sendNotFound(res);
  } catch {
    sendNotFound(res);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Rock Art dev server → http://localhost:${PORT}  (PHP form needs: php -S localhost:8000)`);
});
