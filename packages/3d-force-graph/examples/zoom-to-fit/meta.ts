// 3d-force-graph example: Render control: zoomToFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: zoomToFit",
  summary:
    "zoomToFit(ms, padding) moves the camera until every node is inside the view, leaving padding pixels at the edge (the dashed frame). Throw the camera away and bring it back with different durations and paddings.",
  section: "Render control",
  tags: ['zoomToFit', 'cameraPosition'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
