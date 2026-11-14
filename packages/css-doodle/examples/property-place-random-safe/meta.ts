// css-doodle example: @place at random, and safe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@place at random, and safe",
  summary:
    "Two scatterings of thirty circles with the same code except one word. Without safe a cell near an edge hangs outside; safe keeps every cell inside the container.",
  section: "Properties",
  tags: ['@place', 'safe', '@r', '@size'],
  docs: [
    'pages/css-doodle-com/reference/property-place.md',
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
