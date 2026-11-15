// tanstack-charts example: Every view is placed exactly once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Every view is placed exactly once",
  summary:
    "composeViews fails instead of drawing a partial scene when a layout leaves a view out or places one twice. The types catch this in TypeScript, so each button widens the types and calls composeViews anyway: the readout prints each failure message, then a valid layout.",
  section: "View Composition",
  tags: ["composeViews", "grid", "validation"],
  docs: ["repo/docs/reference/view-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
