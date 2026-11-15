// vega example: Area: Interpolation Methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Area: Interpolation Methods",
  summary:
    "One six-point area stepped through all nine interpolate methods. Cardinal and catmull-rom also respond to tension, and the dots show the data the curve passes (or only approaches) at each method.",
  section: "Mark Types",
  tags: ['marks.area.interpolate','marks.area.tension','marks.area.defined'],
  docs: ['repo/docs/docs/marks/area.md', 'repo/docs/docs/marks/area.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
