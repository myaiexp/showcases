// 3d-force-graph example: Render control: scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: scene",
  summary:
    "scene() is the three Scene behind the graph. A GridHelper floor is added under the layout and fog is set on the scene, next to the graph's own objects, and both can be toggled.",
  section: "Render control",
  tags: ['scene', 'getGraphBbox', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
