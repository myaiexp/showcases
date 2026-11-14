// PlayCanvas example: Wide line caps, joins and dashes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wide line caps, joins and dashes",
  summary:
    "A WideLineRenderer showing the three caps, the three joins, a dashed line with a marching offset, a line with per-point colours and widths, and a closed loop. The full view switches width units and adjusts the dash pattern.",
  section: "Graphics",
  tags: ["WideLineRenderer", "WideLine", "LINECAP_ROUND", "LINEJOIN_ROUND", "dashLength", "gapLength", "dashOffset", "closed", "widthUnits"],
  docs: ["repo/docs/user-manual/graphics/wide-lines.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
