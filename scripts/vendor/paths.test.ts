// URL→file mapping, link extraction and crawl scope for vendor-docs
import { describe, expect, it } from 'vitest';
import { crawl, extractLinks, inScope, pageFile } from './paths.ts';

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
    const linksOf = async (u: string): Promise<string[]> => graph[u] ?? [];
    expect(await crawl('https://d.io/', 'https://d.io/', 10, linksOf)).toEqual([
      'https://d.io/',
      'https://d.io/a',
      'https://d.io/b',
      'https://d.io/c',
    ]);
    expect(await crawl('https://d.io/', 'https://d.io/', 2, linksOf)).toHaveLength(2);
  });
});
