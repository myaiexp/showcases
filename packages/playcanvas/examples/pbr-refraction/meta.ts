// PlayCanvas example: Refraction and dispersion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Refraction and dispersion",
  summary:
    "A glass sphere and capsule drift in front of a striped backdrop, using dynamic refraction so the stripes bend. The full view sets the IOR (refractionIndex is 1/IOR), thickness, absorption distance and dispersion.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "refraction", "refractionIndex", "thickness", "dispersion", "useDynamicRefraction", "attenuation", "attenuationDistance"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md", "repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
