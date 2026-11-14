// css-doodle example: @place at fixed points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@place at fixed points",
  summary:
    "@place positions the centre of a cell at an x and y, so a cell near an edge can hang outside the container. Five cells here sit at keyword, percentage, calc-like and mixed points.",
  section: "Properties",
  tags: ['@place', '@size', '@cell'],
  docs: [
    'pages/css-doodle-com/reference/property-place.md',
    'pages/css-doodle-com/reference/selector-cell.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
