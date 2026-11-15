// 3d-force-graph example: Render control: fly to a node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: fly to a node",
  summary:
    "onNodeClick calls cameraPosition with a point beyond the clicked node, on the line from the graph centre, and the node as lookAt, over 1.5 seconds. A button flies back out with zoomToFit.",
  section: "Render control",
  tags: ['cameraPosition', 'onNodeClick', 'zoomToFit', 'nodeAutoColorBy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
