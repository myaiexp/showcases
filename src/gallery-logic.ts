// Pure filter and sort rules for the home page's package list

import type { PackageEntry } from './registry.ts';

export const SORTS = {
  newest: 'Newest',
  name: 'Name',
  examples: 'Most examples',
} as const;
export type SortKey = keyof typeof SORTS;

export const ALL = 'All';

export function filterPackages(
  list: readonly PackageEntry[],
  category: string,
  query: string,
): PackageEntry[] {
  const q = query.trim().toLowerCase();
  return list.filter(
    (p) =>
      (category === ALL || p.category === category) &&
      (q === '' || `${p.name} ${p.npm} ${p.tagline}`.toLowerCase().includes(q)),
  );
}

export function sortPackages(list: readonly PackageEntry[], key: SortKey): PackageEntry[] {
  const byName = (a: PackageEntry, b: PackageEntry): number => a.name.localeCompare(b.name);
  const out = [...list];
  switch (key) {
    case 'newest':
      return out.sort((a, b) => b.added.localeCompare(a.added) || byName(a, b));
    case 'name':
      return out.sort(byName);
    case 'examples':
      return out.sort((a, b) => b.exampleCount - a.exampleCount || byName(a, b));
  }
}

/** Categories that have at least one package, in the canonical order, with "All" first. */
export function usedCategories(
  list: readonly PackageEntry[],
  canonical: readonly string[],
): string[] {
  const used = new Set<string>(list.map((p) => p.category));
  return [ALL, ...canonical.filter((c) => used.has(c))];
}
