// vega example: Airports 7: plot every connection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 7: plot every connection",
  summary:
    "Step 9: every route in flights-airport.csv gets its origin and destination airports by lookup, then a straight linkpath; non-interactive faint paths.",
  section: 'Tutorial: Airports',
  tags: ['transform.lookup',  'transform.linkpath',  'mark.interactive'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-connect-all.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
