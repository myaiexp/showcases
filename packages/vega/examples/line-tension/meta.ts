// vega example: Line: Tension on Three Curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: Tension on Three Curves",
  summary:
    "Three lines over the same zigzag data. A single tension signal in [0, 1] bends them in different ways: cardinal tightens as it grows, catmull-rom goes from loose to straight, bundle from straight to loose.",
  section: "Mark Types",
  tags: ['marks.line.tension','marks.line.interpolate'],
  docs: ['repo/docs/docs/marks/line.md', 'repo/docs/docs/marks/line.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
