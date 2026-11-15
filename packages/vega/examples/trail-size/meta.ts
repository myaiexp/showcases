// vega example: Trail: Width that Follows the Data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Trail: Width that Follows the Data",
  summary:
    "A trail through six points, thinner where the value is higher, since the size scale runs from 5 down to 1 and a signal multiplies it. The third point can be dropped to break the trail.",
  section: "Mark Types",
  tags: ['marks.trail.size','marks.trail.defined','value.mult'],
  docs: ['repo/docs/docs/marks/trail.md', 'repo/docs/docs/marks/trail.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
