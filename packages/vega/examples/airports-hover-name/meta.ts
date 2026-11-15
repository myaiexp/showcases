// vega example: Airports 5: airport name on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Airports 5: airport name on hover",
  summary:
    "Step 7: a hover signal set by symbol:mouseover and cleared by symbol:mouseout, and a title signal that turns it into the name shown top right.",
  section: 'Tutorial: Airports',
  tags: ['signal.on',  'event.mouseover',  'signal.update',  'mark.text'],
  docs: ['repo/docs/tutorials/airports/index.md', 'repo/docs/tutorials/airports/airports-hover.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
