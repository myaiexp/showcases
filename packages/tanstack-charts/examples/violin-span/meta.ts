// tanstack-charts example: Violin span and outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Violin span and outline',
  summary:
    'span is the full peak width in category-step units: 1 makes a peak one complete step wide, and values above 1 let neighbouring violins overlap. stroke: null removes the outline. The slider changes span and a checkbox toggles the outline.',
  section: 'Violin Marks',
  tags: ['violinY', 'span', 'stroke'],
  docs: ['repo/docs/reference/marks/violin.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
