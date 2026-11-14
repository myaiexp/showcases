// observable-plot example: Window: slope as a mapped channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Window: slope as a mapped channel',
  summary:
    'Unemployment lines per metro division, colored by the monthly change. Plot.window with the difference reducer runs inside Plot.map on the stroke channel.',
  section: 'Transform: Window',
  tags: ['window', 'map', 'lineY', 'difference'],
  docs: ['repo/docs/transforms/window.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
