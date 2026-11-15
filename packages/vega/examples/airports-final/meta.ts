// vega example: Airports 10: the finished map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 10: the finished map",
  summary:
    "Step 12: the finished visualization. A cell_stroke signal toggles on dblclick and the cells' stroke reads it, so the voronoi diagram can be shown; mousedown! consumes the click.",
  section: 'Tutorial: Airports',
  tags: ['signal.on',  'event.dblclick',  'event.consume',  'transform.voronoi'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
