// vega example: Airports 3: filter airports by traffic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 3: filter airports by traffic",
  summary:
    "Step 5: flights-airport.csv summed per origin airport with aggregate, joined onto airports with lookup, and airports with no originating flights filtered out.",
  section: 'Tutorial: Airports',
  tags: ['transform.aggregate',  'transform.lookup',  'transform.filter'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-filtered.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
