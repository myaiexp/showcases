// vchart example: Grid layout: stacked line charts sharing one axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid layout: stacked line charts sharing one axis",
  summary:
    "Several line regions stacked in one column of a grid layout share a single bottom axis and one legend. Each row has its own left axis in column 0; the axis and legend elements are placed explicitly, so the shared axis only appears under the last region.",
  section: 'Layout',
  tags: ['layout.elements', 'regionId', 'legend', 'axes', 'shared axis', 'grid'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Cases/example-grid.md',
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Strategy.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
