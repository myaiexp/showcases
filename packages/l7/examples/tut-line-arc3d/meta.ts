// l7 example: 3D arc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D arc",
  summary:
    "The 3D arc needs only shape('arc3d') in place of 'arc'. Pitch the map and the arcs rise off it; the card orbits.",
  section: "Tutorial: Line",
  tags: ["shape","arc3d","pitch","opacity"],
  docs: ["repo/site/docs/tutorial/line/arc3d.en.md","repo/site/docs/api/common/features/animate.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
