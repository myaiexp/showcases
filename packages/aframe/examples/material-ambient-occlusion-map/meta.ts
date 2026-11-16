// aframe example: material: ambientOcclusionMap darkens crevices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: ambientOcclusionMap darkens crevices",
  summary: "A painted grayscale map with dark grooves is used as ambientOcclusionMap on a plane and a box. The grooves take ambient light away from the surface, and ambientOcclusionMapIntensity fades the effect. Direct lights do not touch it, so the light here is ambient.",
  section: 'Components',
  tags: ["material", "ambientOcclusionMap", "ambientOcclusionMapIntensity", "ambientOcclusionTextureRepeat", "ambient light"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
