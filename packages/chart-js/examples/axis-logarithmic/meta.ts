// Chart.js example: Log scale for numbers that span powers of ten
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Log scale for numbers that span powers of ten",
  summary:
    "A logarithmic axis gives each power of ten the same space, so a village and a metropolis both stay visible. Switch between linear and logarithmic to compare.",
  section: 'Axes',
  tags: ['type','logarithmic','ticks.format','scales.x'],
  docs: ['repo/docs/axes/cartesian/logarithmic.md','repo/docs/axes/cartesian/time.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
