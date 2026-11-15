// vega example: Line: Interpolation Methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: Interpolation Methods",
  summary:
    "One six-point line stepped through ten interpolators. Bundle, cardinal and catmull-rom take tension, so the card raises it for those; the dots mark the real data.",
  section: "Mark Types",
  tags: ['marks.line.interpolate','marks.line.tension','marks.line.strokeWidth'],
  docs: ['repo/docs/docs/marks/line.md', 'repo/docs/docs/marks/line.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
