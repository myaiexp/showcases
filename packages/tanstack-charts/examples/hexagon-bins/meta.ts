// tanstack-charts example: Hexagons sized and coloured by count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexagons sized and coloured by count',
  summary:
    'hexagon draws a pointy-topped symbol at each x/y with radius r. Rows come from binXY cell centres, so the symbol\'s colour and size both show the count of points in that cell. The slider sets the bin resolution; the symbols keep a fixed pixel radius range.',
  section: 'Dot and Hexagon Marks',
  tags: ['hexagon', 'binXY', 'r', 'rScale', 'color'],
  docs: [
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/reference/transforms.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
