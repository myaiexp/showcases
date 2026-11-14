// PlayCanvas example: Clear coat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clear coat",
  summary:
    "A rough, bumpy red base under a second glossy layer, next to the same base without the coat. The full view sets clearCoat, clearCoatGloss, clearCoatBumpiness and a separate clearCoatNormalMap.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "clearCoat", "clearCoatGloss", "clearCoatBumpiness", "clearCoatNormalMap"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
