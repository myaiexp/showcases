// Chart.js example: Highlighting month starts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Highlighting month starts",
  summary:
    "ticks.major.enabled marks the first tick of each month as major, and a scriptable font and colour can then pick those labels out in bold.",
  section: 'Axes',
  tags: ['ticks.major','ticks.font','ticks.color','time'],
  docs: ['repo/docs/axes/styling.md','repo/docs/axes/cartesian/time.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
