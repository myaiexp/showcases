// css-doodle example: The same body inside @svg
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The same body inside @svg",
  summary:
    "Inside @svg, @shape gives path data in the same -1 to 1 square instead of a polygon, with y flipped to point down as SVG does, so the outline looks the same. A viewBox of -1 -1 2 2 places it.",
  section: 'Shapes',
  tags: ['@shape', '@svg', 'path'],
  docs: ['pages/css-doodle-com/reference/function-shape.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
