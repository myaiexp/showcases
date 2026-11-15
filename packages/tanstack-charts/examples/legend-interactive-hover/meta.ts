// tanstack-charts example: Legend hover emphasis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend hover emphasis',
  summary:
    'hover: series makes the legend emphasise the series under the pointer or on a focused button. Mark states can match it: here a state with source legend dims every line that is not the emphasised series. It does not set interaction focus, so no tooltip or crosshair moves.',
  section: 'Legends and Color',
  tags: ['interactiveColorLegend', 'hover', 'states', 'source legend', 'matches'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
