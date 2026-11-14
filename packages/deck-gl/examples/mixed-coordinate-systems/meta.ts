// deck-gl example: Mixing coordinate systems
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mixing coordinate systems",
  summary:
    "Three layers in one view, each with its own coordinateSystem: metre rings, a degree-offset grid and plain longitude/latitude points around Paris.",
  section: "Coordinate systems",
  tags: ["coordinateSystem", "METER_OFFSETS", "LNGLAT_OFFSETS", "LNGLAT"],
  docs: ["repo/docs/developer-guide/coordinate-systems.md", "repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
