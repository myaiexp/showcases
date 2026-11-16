// aframe example: material: opacity, transparent and alphaTest
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: opacity, transparent and alphaTest",
  summary: "Three panels carry a radial glow image with a soft edge. With opacity alone the material stays opaque; transparent: true blends it; alphaTest: 0.5 cuts the image into a hard-edged disc instead, the docs' fix for cut-out PNGs. A slider moves the alpha threshold.",
  section: 'Components',
  tags: ["material", "opacity", "transparent", "alphaTest", "side", "alpha"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
