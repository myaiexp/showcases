// tanstack-charts example: Tick label callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick label callbacks',
  summary:
    'Tick label fontSize, fontWeight, anchor, dx, dy and opacity accept constants or callbacks. A callback receives the value, candidate index, resolved position and band width, and may return undefined to keep the default. Here the first week label is left-anchored and shifted to the band edge, and the last is bold.',
  section: 'Scales, Guides, and Color',
  tags: ['axis.tickLabels', 'fontSize', 'fontWeight', 'anchor', 'dx', 'dy', 'ChartAxisTickLabelContext'],
  docs: ['repo/docs/reference/scales-guides-and-color.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
