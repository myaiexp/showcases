// Pure helpers for vendoring: URL→file mapping, link extraction, crawl scope

/** Maps a docs page URL to a stable markdown path under docs/pages/. */
export function pageFile(url: string): string {
  const u = new URL(url);
  const path = `${u.host}${u.pathname}`
    .replace(/\/+$/, '')
    .replace(/\.(html?|php|aspx?)$/, '')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-')
    .replace(/\/+/g, '/');
  const query = u.search ? `-${u.search.slice(1).replace(/[^a-zA-Z0-9]+/g, '-')}` : '';
  return `pages/${path || u.host}${query}.md`;
}

/** Decodes the character references an href attribute may hold (`&amp;`, `&#x6D;`, `&#109;`). */
function decodeAttr(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** Absolute, fragment-free URLs of every href in an HTML document. */
export function extractLinks(html: string, base: string): string[] {
  const out = new Set<string>();
  for (const match of html.matchAll(/href\s*=\s*["']([^"']*)["']/gi)) {
    const href = decodeAttr(match[1] ?? '');
    if (!href || href.startsWith('#')) continue;
    try {
      const u = new URL(href, base);
      u.hash = '';
      if (u.protocol === 'http:' || u.protocol === 'https:') out.add(u.href);
    } catch {
      // Unparseable href: not a page we can follow.
    }
  }
  return [...out];
}

const ASSET = /\.(png|jpe?g|gif|svg|webp|ico|css|js|mjs|json|xml|zip|woff2?|ttf|mp4|mp3|pdf)$/i;

/** A crawl follows only pages under its prefix, never assets. */
export function inScope(url: string, prefix: string): boolean {
  return url.startsWith(prefix) && !ASSET.test(new URL(url).pathname);
}

/** One visited page: the URL it finally resolved to after redirects, and its links. */
export interface CrawledPage {
  url: string;
  links: string[];
}

/**
 * Breadth-first crawl order over a link graph, capped at `max` pages. `visit` returns
 * null for a page that failed to load. A page that redirects out of the prefix (sites
 * often send a mangled relative link to their home page) or onto a page already queued is
 * not a page of its own, so it is dropped; the start page is kept wherever it lands.
 */
export async function crawl(
  start: string,
  prefix: string,
  max: number,
  visit: (url: string) => Promise<CrawledPage | null>,
): Promise<string[]> {
  const seen = new Set([start]);
  const queue = [start];
  const order: string[] = [];
  while (queue.length > 0 && order.length < max) {
    const url = queue.shift();
    if (url === undefined) break;
    const page = await visit(url);
    if (!page) continue;
    if (page.url !== url && url !== start) {
      if (!inScope(page.url, prefix) || seen.has(page.url)) continue;
      seen.add(page.url);
    }
    order.push(page.url);
    for (const link of page.links) {
      if (!seen.has(link) && inScope(link, prefix)) {
        seen.add(link);
        queue.push(link);
      }
    }
  }
  return order;
}
