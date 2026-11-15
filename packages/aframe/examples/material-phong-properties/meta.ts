// aframe example: material: phong shininess, specular, reflectivity and refract
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: phong shininess, specular, reflectivity and refract",
  summary: "Sliders drive the phong shader on a torus knot reflecting a painted environment: shininess sharpens the highlight, reflectivity sets how much of envMap shows, and refract bends the environment through the surface with refractionRatio.",
  section: 'Components',
  tags: ["material", "phong", "shininess", "specular", "reflectivity", "refract", "refractionRatio", "combine", "envMap"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
