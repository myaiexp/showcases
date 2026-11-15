// vega example: Airports 4: size airports by traffic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 4: size airports by traffic",
  summary:
    "Step 6: a linear scale from the traffic domain to [16, 1000] square pixels sets each symbol's size, so hubs stand out from local airports.",
  section: 'Tutorial: Airports',
  tags: ['scale.linear',  'encode.size',  'mark.symbol'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-sized.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
