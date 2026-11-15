// d2 example: Globs: filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: filters',
  summary:
    'A `&` line inside a glob block restricts it to shapes whose attribute matches, and `!&` inverts that. The tabs apply `multiple` to the `person` shapes, to everything that is not a person, and to the shapes whose class array contains `server`.',
  section: 'Globs',
  tags: ['globs', 'filter', 'inverse filter', 'class'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-filter.d2', 'repo/static/d2/globs-inverse-filter.d2', 'repo/static/d2/globs-filter-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
