// PlayCanvas example: Dynamic wide lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic wide lines",
  summary:
    "A tapering coloured trail rewritten every frame with setPositions in one renderer and a static grid in another, passing behind a sphere. The full view toggles depth test, width units and each renderer.",
  section: "Graphics",
  tags: ["WideLineRenderer", "WideLine", "setPositions", "setWidths", "depthTest", "enabled", "widthUnits", "LINEWIDTH_WORLD"],
  docs: ["repo/docs/user-manual/graphics/wide-lines.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
