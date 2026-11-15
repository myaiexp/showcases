// vega example: Airports 2: plot every airport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 2: plot every airport",
  summary:
    "Step 4: airports.csv parsed with parse \"auto\", projected with the geopoint transform, rows the projection returns null for filtered out, and one small symbol per airport.",
  section: 'Tutorial: Airports',
  tags: ['format.csv',  'transform.geopoint',  'transform.filter',  'mark.symbol'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-all.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
