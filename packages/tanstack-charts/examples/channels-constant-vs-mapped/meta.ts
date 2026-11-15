// tanstack-charts example: Constant, colour channel and visual accessor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Constant, colour channel and visual accessor',
  summary:
    'Revenue bars painted three ways: a constant fill, a colour channel resolved by the chart colour scale, and a per-row fill accessor that flags products with many returns.',
  section: 'Data and Channels',
  tags: ['barX', 'fill', 'color', 'VisualChannel'],
  docs: [
    'repo/docs/concepts/data-and-channels.md',
    'repo/docs/concepts/marks-and-layering.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
