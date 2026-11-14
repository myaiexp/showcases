// vchart example: Progressive rendering: large mode on a scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Progressive rendering: large mode on a scatter",
  summary:
    "The large and largeThreshold options switch a scatter series to a cheaper drawing mode when the data is long enough. The full view toggles large, the point count and the threshold and reports the render time.",
  section: "Progressive Rendering",
  tags: ['large','largeThreshold','scatter','renderSync'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Progressive_Render.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
