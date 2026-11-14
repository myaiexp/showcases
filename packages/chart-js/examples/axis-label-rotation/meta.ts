// Chart.js example: Long labels: rotation and skipping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Long labels: rotation and skipping",
  summary:
    "When labels are too long to fit, Chart.js rotates them between minRotation and maxRotation, then skips some (autoSkip, autoSkipPadding). Turn the options to see which labels survive.",
  section: 'Axes',
  tags: ['ticks.minRotation','ticks.maxRotation','ticks.autoSkip','ticks.autoSkipPadding'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
