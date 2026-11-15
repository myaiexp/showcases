// embedding-atlas example: a predicates chart with a preselected item
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SQL predicates chart",
  summary:
    "A { type: \"predicates\", items } chart lists named SQL conditions as filters. The state selection holds the exact predicate strings; the variants preselect different ones and the words histogram follows.",
  section: "Charts",
  tags: ['predicates', 'items', 'PredicatesState', 'selection', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
