// vega example: Path: One Shape per Datum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: One Shape per Datum",
  summary:
    "Four rows, each with its own SVG path string for a different outline, laid out in a row. A shared angle and scale signal turns and pulses them together.",
  section: "Mark Types",
  tags: ['marks.path.path','marks.path.angle','marks.path.scaleX','marks.path.scaleY'],
  docs: ['repo/docs/docs/marks/path.md', 'repo/docs/docs/marks/path.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
