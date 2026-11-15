// vega example: Area: Range Band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Area: Range Band",
  summary:
    "A band between a low and a high value per point, with the mid line on top. The spread signal widens and narrows the band around the same centre.",
  section: "Mark Types",
  tags: ['marks.area.y2','marks.area.interpolate','marks.line'],
  docs: ['repo/docs/docs/marks/area.md', 'repo/docs/docs/marks/area.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
