// vega example: Force: Dragging Nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force: Dragging Nodes",
  summary:
    "Drag a node and it is pinned with fx and fy while the rest of the graph keeps adjusting; release and it rejoins the simulation.",
  section: "Transforms: Layout",
  tags: ["transform.force.restart", "mark.on.modify", "signal.on"],
  docs: ["repo/docs/docs/transforms/force.md", "repo/docs/docs/transforms/force.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/expressions.md", "repo/docs/docs/event-streams.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
