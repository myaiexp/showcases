// PlayCanvas example: Iridescence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Iridescence",
  summary:
    "Thin-film colour shifts on a metallic sphere and torus. The full view sets iridescence, the film's refraction index and its thickness range, and can drive thickness from a generated map.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "useIridescence", "iridescence", "iridescenceRefractionIndex", "iridescenceThicknessMin", "iridescenceThicknessMax", "iridescenceThicknessMap"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
