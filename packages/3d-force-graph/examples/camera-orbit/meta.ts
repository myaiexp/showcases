// 3d-force-graph example: Render control: orbiting camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: orbiting camera",
  summary:
    "A frame loop calls cameraPosition({x, y, z}, lookAt) with no transition, on a circle around the graph. The speed slider sets (and reverses) the orbit; the graph is fitted once with zoomToFit(0) so the circle has the right radius.",
  section: "Render control",
  tags: ['cameraPosition', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
