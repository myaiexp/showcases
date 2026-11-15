// vega example: Airports 8: connections on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 8: connections on hover",
  summary:
    "Step 10: a filter on the routes data reads the hover signal, so moving over an airport re-runs the dataflow and draws just its outgoing routes.",
  section: 'Tutorial: Airports',
  tags: ['transform.filter',  'signal',  'transform.linkpath'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-connect-hover.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
