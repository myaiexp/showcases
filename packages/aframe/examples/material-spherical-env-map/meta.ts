// aframe example: material: sphericalEnvMap from a sky-style image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: sphericalEnvMap from a sky-style image",
  summary: "sphericalEnvMap takes one spherical image, of the kind you would assign to an <a-sky>. The same painted panorama is the sky behind and the reflection in a mirror-like sphere and torus, so the reflections line up with the scene.",
  section: 'Components',
  tags: ["material", "sphericalEnvMap", "a-sky", "roughness", "metalness"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
