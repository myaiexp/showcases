// g6 example: Collapse and expand combos by API
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collapse and expand combos by API',
  summary:
    'graph.collapseElement and graph.expandElement on nested combos, with the align option that keeps the remaining nodes in place.',
  section: 'Combo',
  tags: ['collapseElement', 'expandElement', 'align'],
  docs: [
    'repo/packages/site/docs/api/element.en.md',
    'repo/packages/site/docs/manual/element/combo/BaseCombo.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
