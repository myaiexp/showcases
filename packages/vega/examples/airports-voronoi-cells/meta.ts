// vega example: Airports 9: hover the nearest airport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 9: hover the nearest airport",
  summary:
    "Step 11: a voronoi transform gives every airport the cell of points nearest it, drawn as transparent paths named \"cell\"; the hover signal listens to @cell events.",
  section: 'Tutorial: Airports',
  tags: ['transform.voronoi',  'event.markname',  'autosize.none'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-voronoi.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
