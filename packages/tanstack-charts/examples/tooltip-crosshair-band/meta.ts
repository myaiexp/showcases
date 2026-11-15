// tanstack-charts example: Cursor band behind stacked bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cursor band behind stacked bars',
  summary:
    'A crosshair axis with band set paints a plot-spanning band centred on the focused category, below the bars when the mark comes first. A second crosshair after the bars adds a dashed y rule labelled with the stack endpoint.',
  section: 'Tooltips and Focus',
  tags: ['crosshair', 'band', 'barY', 'focus', 'tooltip'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
