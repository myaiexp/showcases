// tanstack-charts example: Tick count scales with the size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick count scales with the size',
  summary:
    'Without an axis.ticks policy the tick target is clamp(2, floor(width / 92), 8) for x and clamp(2, floor(height / 48), 7) for y. The chart narrows and the readout compares that target with the ticks the scale actually returned.',
  section: 'Responsive Charts',
  tags: ['axis.ticks', 'scene.scales', 'scaleLinear'],
  docs: ['repo/docs/guides/responsive-charts.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
