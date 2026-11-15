// vega example: Airports 6: sort airports by size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 6: sort airports by size",
  summary:
    "Step 8: collect with a descending sort on traffic.flights, so smaller airports are drawn last, on top of the hubs that used to hide them.",
  section: 'Tutorial: Airports',
  tags: ['transform.collect',  'collect.sort'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-sort.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
