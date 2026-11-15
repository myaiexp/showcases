// aframe example: material: normalMap and normalScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: normalMap and normalScale",
  summary: "A painted tangent-space normal map of round bumps gives a flat plane the look of relief under a moving light. normalScale sets how strong the effect is and normalTextureRepeat tiles the map; the geometry itself never changes.",
  section: 'Components',
  tags: ["material", "normalMap", "normalScale", "normalTextureRepeat", "normalTextureOffset", "standard"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
