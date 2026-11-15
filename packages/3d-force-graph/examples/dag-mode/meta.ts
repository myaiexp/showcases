// 3d-force-graph example: Force engine: dagMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: dagMode",
  summary:
    "dagMode pins each node of a directed acyclic graph to a level by its depth: top-down, bottom-up, left-right, right-left, near-far, far-near, or in rings going out or in. The select switches between all eight.",
  section: "Force engine configuration",
  tags: ['dagMode', 'nodeAutoColorBy', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
