// vchart example: Range area: min and max fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range area: min and max fields',
  summary:
    'A rangeArea chart fills the band between two fields: yField is the pair of lower and upper bounds. The crosshair on the x axis marks the hovered position, and the band gets new bounds on a timer.',
  section: 'Line and Area',
  tags: ['rangeArea', 'yField', 'area.style', 'crosshair'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/RangeArea.md',
    'repo/docs/assets/option/en/series/range-area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
