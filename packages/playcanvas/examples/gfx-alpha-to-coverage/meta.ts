// PlayCanvas example: Alpha to coverage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Alpha to coverage",
  summary:
    "Five spheres with opacities from 0.15 to 0.85 using alphaToCoverage, so MSAA samples quantise the opacity, above the same row blended normally, and a cutout card whose edge is softened. The full view toggles the flag.",
  section: "Graphics",
  tags: ["StandardMaterial", "alphaToCoverage", "opacity", "alphaTest", "GraphicsDevice"],
  docs: ["repo/docs/user-manual/graphics/transparency.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
