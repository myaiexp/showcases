// l7 example: setPitch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setPitch",
  summary:
    "setPitch tilts the camera; 3D cylinder columns, flat when seen from above, stand up as the map leans back.",
  section: 'Scene',
  tags: ["setPitch", "getPitch", "cylinder"],
  docs: ["repo/site/docs/api/scene.en.md", "repo/site/docs/api/point_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
