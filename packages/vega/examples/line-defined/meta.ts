// vega example: Line: Breaks and Isolated Points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: Breaks and Isolated Points",
  summary:
    "A line with undefined points breaks into pieces. The point left alone between two gaps vanishes with a butt cap, and reappears when the cap is round or square, as the docs note.",
  section: "Mark Types",
  tags: ['marks.line.defined','marks.line.strokeCap'],
  docs: ['repo/docs/docs/marks/line.md', 'repo/docs/docs/marks/line.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
