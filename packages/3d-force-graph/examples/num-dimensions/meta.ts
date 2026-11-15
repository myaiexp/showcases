// 3d-force-graph example: Force engine: numDimensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: numDimensions",
  summary:
    "numDimensions runs the layout in 1, 2 or 3 dimensions: at 2 the nodes flatten into a plane and at 1 onto a line, because the erased coordinates are no longer simulated.",
  section: "Force engine configuration",
  tags: ['numDimensions', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
