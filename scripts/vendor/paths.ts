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

/** Absolute, fragment-free URLs of every href in an HTML document. */
export function extractLinks(html: string, base: string): string[] {
  const out = new Set<string>();
  for (const match of html.matchAll(/href\s*=\s*["']([^"'#][^"']*)["']/gi)) {
    const href = match[1];
    if (!href) continue;
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

/** Breadth-first crawl order over a link graph, capped at `max` pages. */
export async function crawl(
  start: string,
  prefix: string,
  max: number,
  linksOf: (url: string) => Promise<string[]>,
): Promise<string[]> {
  const seen = new Set([start]);
  const queue = [start];
  const order: string[] = [];
  while (queue.length > 0 && order.length < max) {
    const url = queue.shift();
    if (url === undefined) break;
    order.push(url);
    for (const link of await linksOf(url)) {
      if (!seen.has(link) && inScope(link, prefix)) {
        seen.add(link);
        queue.push(link);
      }
    }
  }
  return order;
}
