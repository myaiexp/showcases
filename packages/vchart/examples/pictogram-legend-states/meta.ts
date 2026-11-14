// vchart example: Pictogram: categories, legend and active state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pictogram: categories, legend and active state",
  summary:
    "A parking lot SVG whose bays take colours from color.specified by status. The legend (with filter false) drives the active state of the bays through the element-active-by-legend interaction; statuses reshuffle every 1.6 seconds.",
  section: "Word Cloud and Pictogram",
  tags: ['pictogram','color.specified','element-active-by-legend','legends','state.active'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pictogram.md',
    'repo/docs/assets/option/en/series/pictogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
