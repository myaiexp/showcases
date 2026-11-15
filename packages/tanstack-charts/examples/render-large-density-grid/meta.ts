// tanstack-charts example: A density grid in place of a point cloud
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A density grid in place of a point cloud",
  summary:
    "A cloud of 20,000 points is counted into a fixed grid and drawn as at most a few hundred cells, colored by count. The readout checks the invariant the guide asks for: the cell counts sum to the source count. The slider changes how many cells the grid has.",
  section: "Large Data",
  tags: ['rect', 'color scale', 'density grid', 'aggregation', 'invariant'],
  docs: [
    'repo/docs/guides/large-data.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
