// PlayCanvas example: Wire renderer shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wire renderer shapes",
  summary:
    "Every WireRenderer shape drawn in its own spinning local space with the transform property, from two renderers with different state: one depth tested behind a translucent slab, one drawing on top. Includes a frustum and a light.",
  section: "Graphics",
  tags: ["WireRenderer", "line", "lines", "polyline", "loop", "sphere", "cylinder", "capsule", "cone", "plane", "point", "arrow", "axes", "frustum", "light", "transform", "depthTest", "segments"],
  docs: ["repo/docs/user-manual/graphics/debug-drawing.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
