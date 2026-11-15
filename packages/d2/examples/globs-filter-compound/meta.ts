// d2 example: Globs: AND and endpoint filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: AND and endpoint filters',
  summary:
    'Several `&` lines in one glob must all match (AND). Connection globs can also filter on the shapes at their ends with `&src` and `&dst`, by property or by ID. The first tab fills a connected person red; the second styles edges by their endpoints.',
  section: 'Globs',
  tags: ['globs', 'filter', 'and', 'src', 'dst'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-filter-and.d2', 'repo/static/d2/globs-filter-endpoints.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
