// d2 example: Globs: property and glob-value filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: property and glob-value filters',
  summary:
    '`&connected` and `&leaf` filter on the shape\'s place in the graph (connected to something, no children), and `&link: *` matches shapes that set a `link` at all. The first tab yellow-fills connected shapes and outlines leaves red; the second reddens linked shapes.',
  section: 'Globs',
  tags: ['globs', 'filter', 'connected', 'leaf', 'link'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-filter-3.d2', 'repo/static/d2/globs-filter-glob-value.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
