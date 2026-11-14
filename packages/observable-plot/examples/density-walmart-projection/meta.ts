// observable-plot example: Density: Walmart stores on a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: Walmart stores on a map",
  summary: "A density mark with fill set to the density keyword, drawn through the albers (equal-area) projection over state borders and the nation outline, with a dot per store. The full view picks the colour scheme.",
  section: 'Mark: Density',
  tags: ['density', 'projection', 'geo', 'fill', 'bandwidth'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/walmarts.ts', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
