// PlayCanvas example: Energy conservation and Fresnel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Energy conservation and Fresnel",
  summary:
    "Five spheres lit by one point light and no environment, gloss 0.15 to 0.95: smooth ones show small bright highlights, rough ones large dim patches. The camera sweeps towards the horizon, where Fresnel makes surfaces reflect more.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "gloss", "metalness", "omni light"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/index.md", "repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
