// Home page filter, search and sort rules
import { describe, expect, it } from 'vitest';
import { ALL, filterPackages, sortPackages, usedCategories } from './gallery-logic.ts';
import type { PackageEntry } from './registry.ts';

const pkg = (slug: string, category: PackageEntry['category'], added: string, exampleCount: number): PackageEntry => ({
  slug,
  name: slug.toUpperCase(),
  npm: slug,
  tagline: `${slug} tagline`,
  category,
  homepage: 'https://x.test',
  docsUrl: 'https://x.test',
  repo: 'https://x.test',
  added: added as PackageEntry['added'],
  sections: ['Basics'],
  exampleCount,
});

const list = [pkg('b', 'Graphics', '2026-01-02', 5), pkg('a', 'Audio', '2026-03-01', 1), pkg('c', 'Graphics', '2026-02-01', 9)];

describe('gallery logic', () => {
  it('filters by category and query', () => {
    expect(filterPackages(list, 'Graphics', '').map((p) => p.slug)).toEqual(['b', 'c']);
    expect(filterPackages(list, ALL, 'C TAG').map((p) => p.slug)).toEqual(['c']);
  });

  it('sorts newest, by name and by example count', () => {
    expect(sortPackages(list, 'newest').map((p) => p.slug)).toEqual(['a', 'c', 'b']);
    expect(sortPackages(list, 'name').map((p) => p.slug)).toEqual(['a', 'b', 'c']);
    expect(sortPackages(list, 'examples').map((p) => p.slug)).toEqual(['c', 'b', 'a']);
  });

  it('lists only used categories, canonical order, All first', () => {
    expect(usedCategories(list, ['Animation', 'Graphics', 'Audio'])).toEqual([ALL, 'Graphics', 'Audio']);
  });
});
