// g6 example: EdgeFilterLens: edges inside a lens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EdgeFilterLens: edges inside a lens',
  summary: 'The lens keeps only the edges that match nodeType within its circle, drawing them with labels and hiding the rest there. The card moves the lens by calling its handler on a timer.',
  section: 'Plugin',
  tags: ['edge-filter-lens', 'trigger', 'r', 'nodeType'],
  docs: ['repo/packages/site/docs/manual/plugin/EdgeFilterLens.en.md', 'repo/packages/site/common/api/plugins/edge-filter-lens.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
