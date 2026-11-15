// tanstack-charts example: Motion on the whole chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion on the whole chart',
  summary:
    'defineChart({ motion }) applies one timing to every mark and guide in the definition, between the renderer fallback and any mark-level override. Bars, the axis ticks and the grid all use this tween, and the same definition would paint plain final geometry in static SVG or canvas.',
  section: 'Motion',
  tags: ['motion', 'defineChart', 'transition', 'tween'],
  docs: ['repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
