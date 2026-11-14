// Chart.js example: Tick label alignment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tick label alignment",
  summary:
    "ticks.align shifts labels along the axis (start, centre, end, inner) and ticks.crossAlign shifts them across it, which matters for right-aligned or left-aligned y labels.",
  section: 'Axes',
  tags: ['ticks.align','ticks.crossAlign','indexAxis'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
