// g6 example: Graph option data: nodes, edges and combos
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option data: nodes, edges and combos',
  summary:
    'The data option holds nodes, edges and combos; node data carries its combo id, position and business fields. Buttons fold and unfold the combo.',
  section: 'Graph',
  tags: ['data', 'data.nodes', 'data.edges', 'data.combos', 'collapseElement', 'expandElement'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
    'repo/packages/site/docs/manual/data.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
