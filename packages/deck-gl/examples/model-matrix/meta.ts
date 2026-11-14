// deck-gl example: modelMatrix on a layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "modelMatrix on a layer",
  summary:
    "An L-shaped plot in METER_OFFSETS rotated, scaled and moved by a modelMatrix built with math.gl Matrix4, drawn over its untransformed ghost.",
  section: "Coordinate systems",
  tags: ["modelMatrix", "METER_OFFSETS", "SolidPolygonLayer"],
  docs: ["repo/docs/developer-guide/coordinate-systems.md", "repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
