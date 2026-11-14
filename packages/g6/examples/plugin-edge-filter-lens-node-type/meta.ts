// g6 example: EdgeFilterLens: nodeType, radius and trigger
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EdgeFilterLens: nodeType, radius and trigger',
  summary: 'nodeType sets which end of an edge must be in the lens (both, source, target or either); r and the click or drag triggers change the lens size and how it moves.',
  section: 'Plugin',
  tags: ['edge-filter-lens', 'nodeType', 'r', 'trigger', 'minR', 'maxR'],
  docs: ['repo/packages/site/docs/manual/plugin/EdgeFilterLens.en.md', 'repo/packages/site/common/api/plugins/edge-filter-lens.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
