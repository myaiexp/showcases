// tanstack-charts example: A clamped scale instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A clamped scale instance',
  summary:
    'A scale instance keeps whatever the caller configured, including clamp, while Charts supplies only the pixel range. With a fixed 0 to 100 domain, out-of-range readings draw beyond the plot area by default. A clamped instance pins them to the edge instead, so a sensor spike cannot leave the chart.',
  section: 'Scales, Guides, and Color',
  tags: ['scaleLinear', 'clamp', 'fixed domain', 'instance'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
