// g6 example: Edges follow a collapsed combo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edges follow a collapsed combo',
  summary:
    'Edges from outside nodes to nodes inside a combo re-attach to the combo when it collapses and return to the nodes when it expands.',
  section: 'Combo',
  tags: ['collapseElement', 'expandElement', 'collapse-expand', 'edges'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/overview.en.md',
    'repo/packages/site/docs/api/element.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
