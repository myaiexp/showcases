// Chart.js example: Bars and a line on one chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bars and a line on one chart",
  summary:
    "Give each dataset its own type to mix chart kinds: rainfall as bars and temperature as a line, with a second value axis on the right so each reads in its own unit.",
  section: 'Chart types',
  tags: ['mixed','type','yAxisID','bar','line'],
  docs: ['repo/docs/charts/mixed.md', 'repo/docs/axes/cartesian/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
