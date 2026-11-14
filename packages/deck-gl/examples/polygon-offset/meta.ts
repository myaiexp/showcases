// deck-gl example: getPolygonOffset and z-fighting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getPolygonOffset and z-fighting",
  summary:
    "Two coplanar polygons in a pitched view: the default stacks layers by index, [0, 0] lets them z-fight, a negative offset pulls one layer toward the camera.",
  section: "Using layers",
  tags: ["getPolygonOffset", "SolidPolygonLayer", "z-fighting"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
