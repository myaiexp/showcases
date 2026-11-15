// 3d-force-graph example: Force engine: ngraph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: ngraph",
  summary:
    "forceEngine('ngraph') swaps d3-force-3d for ngraph.forcelayout. The same graph is laid out by both engines side by side with a tick counter; node dragging is a d3-only feature.",
  section: "Force engine configuration",
  tags: ['forceEngine', 'onEngineTick', 'cooldownTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
