// vega example: Airports 1: a U.S. state map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 1: a U.S. state map",
  summary:
    "Step 3 of the tutorial: us-10m.json loaded as TopoJSON (feature \"states\"), projected with albersUsa centred by signal expressions, and drawn as path marks.",
  section: 'Tutorial: Airports',
  tags: ['format.topojson',  'projection.albersUsa',  'transform.geopath',  'mark.path'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-map.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
