// observable-plot example: Crosshair: crosshairX on a time series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair: crosshairX on a time series',
  summary:
    'crosshairX points by the x position, the right choice when time is the dominant dimension of a line chart.',
  section: 'Interaction: Crosshair',
  tags: ['crosshairX', 'lineY'],
  docs: ['repo/docs/interactions/crosshair.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
