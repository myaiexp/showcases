// d2 example: Globs: wildcards in keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: wildcards in keys',
  summary:
    'A `*` in a key matches any run of characters among the shapes at that level. The first tab sets sizes for every phone and overrides two by name suffix; the second shows matching ignoring case; the third a `*` between letters.',
  section: 'Globs',
  tags: ['globs', 'wildcard', 'case-insensitive'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-intro.d2', 'repo/static/d2/globs-casing.d2', 'repo/static/d2/globs-multiple.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
