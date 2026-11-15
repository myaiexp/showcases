// 3d-force-graph example: Render control: zoomToFit on a subset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: zoomToFit on a subset",
  summary:
    "The third argument of zoomToFit is a node filter: only nodes it keeps count when the camera is framed. Here each group in turn is framed alone while the other groups dim.",
  section: "Render control",
  tags: ['zoomToFit', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
