// URL→file mapping, link extraction and crawl scope for vendor-docs
import { describe, expect, it } from 'vitest';
import { crawl, extractLinks, inScope, pageFile, type CrawledPage } from './paths.ts';

describe('vendor paths', () => {
  it('maps URLs to stable markdown paths', () => {
    expect(pageFile('https://zzz.dog/')).toBe('pages/zzz-dog.md');
    expect(pageFile('https://animejs.com/documentation/stagger/')).toBe('pages/animejs-com/documentation/stagger.md');
    expect(pageFile('https://x.io/api.html?v=2&x=1')).toBe('pages/x-io/api-v-2-x-1.md');
  });

  it('extracts absolute links without fragments', () => {
    const html = '<a href="/api">a</a><a href=\'#top\'>b</a><a href="shapes#box">c</a><a href="mailto:x@y">d</a>';
    expect(extractLinks(html, 'https://zzz.dog/docs/')).toEqual([
      'https://zzz.dog/api',
      'https://zzz.dog/docs/shapes',
    ]);
  });

  it('keeps crawls under the prefix and off assets', () => {
    expect(inScope('https://zzz.dog/api', 'https://zzz.dog/')).toBe(true);
    expect(inScope('https://zzz.dog/logo.svg', 'https://zzz.dog/')).toBe(false);
    expect(inScope('https://github.com/x', 'https://zzz.dog/')).toBe(false);
  });

  it('crawls breadth-first up to max', async () => {
    const graph: Record<string, string[]> = {
      'https://d.io/': ['https://d.io/a', 'https://d.io/b', 'https://other.io/'],
      'https://d.io/a': ['https://d.io/c', 'https://d.io/'],
      'https://d.io/b': [],
      'https://d.io/c': [],
    };
    const linksOf = async (u: string): Promise<CrawledPage> => ({ url: u, links: graph[u] ?? [] });
    expect(await crawl('https://d.io/', 'https://d.io/', 10, linksOf)).toEqual([
      'https://d.io/',
      'https://d.io/a',
      'https://d.io/b',
      'https://d.io/c',
    ]);
    expect(await crawl('https://d.io/', 'https://d.io/', 2, linksOf)).toHaveLength(2);
  });

  it('decodes entity-encoded hrefs before resolving them', () => {
    const html = '<a href="&#x6D;&#x61;&#x69;&#x6C;&#x74;&#x6F;&#x3A;x@y">m</a><a href="/q?a=1&amp;b=2">q</a>';
    expect(extractLinks(html, 'https://zzz.dog/')).toEqual(['https://zzz.dog/q?a=1&b=2']);
  });

  it('drops failed pages and redirects that leave the prefix or land on a known page', async () => {
    const pages: Record<string, CrawledPage | null> = {
      'https://d.io/docs/': {
        url: 'https://d.io/docs/',
        links: ['https://d.io/docs/a', 'https://d.io/docs/bogus', 'https://d.io/docs/old', 'https://d.io/docs/gone'],
      },
      'https://d.io/docs/a': { url: 'https://d.io/docs/a', links: [] },
      'https://d.io/docs/bogus': { url: 'https://d.io/', links: ['https://d.io/docs/x'] },
      'https://d.io/docs/old': { url: 'https://d.io/docs/a', links: [] },
      'https://d.io/docs/gone': null,
    };
    const visit = async (u: string): Promise<CrawledPage | null> => pages[u] ?? null;
    expect(await crawl('https://d.io/docs/', 'https://d.io/docs/', 10, visit)).toEqual([
      'https://d.io/docs/',
      'https://d.io/docs/a',
    ]);
  });

  it('keeps the start page even when it redirects outside the prefix', async () => {
    const visit = async (): Promise<CrawledPage> => ({ url: 'https://d.io/docs', links: [] });
    expect(await crawl('https://d.io/docs/', 'https://d.io/docs/', 10, visit)).toEqual(['https://d.io/docs']);
  });
});
