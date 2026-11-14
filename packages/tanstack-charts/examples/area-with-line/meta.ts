// tanstack-charts example: Area with a line on top
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area with a line on top',
  summary:
    'Area marks do not draw their upper edge, so the usual layering is areaY and lineY with the same channels and scales. The checkbox removes the line to show the area alone.',
  section: 'Line and Area Marks',
  tags: ['areaY', 'lineY', 'layering', 'z'],
  docs: ['repo/docs/reference/marks/line-and-area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
