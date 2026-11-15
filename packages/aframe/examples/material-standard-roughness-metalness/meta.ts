// aframe example: material: standard roughness and metalness grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: standard roughness and metalness grid",
  summary: "The default standard material is physically based. A grid of spheres steps roughness from 0 to 1 across and metalness from 0 to 0.8 down, lit by two lights and a spherical environment map so metals have something to reflect.",
  section: 'Components',
  tags: ["material", "standard", "roughness", "metalness", "color", "sphericalEnvMap", "physically based"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
