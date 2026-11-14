// PlayCanvas example: Opacity map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opacity map",
  summary:
    "A mottled opacity map makes a sphere and cylinder transparent in patches over a floor. The full view switches between blending and an alpha test cutout, picks the map channel and scales opacity.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "opacityMap", "opacityMapChannel", "opacity", "blendType", "alphaTest"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
