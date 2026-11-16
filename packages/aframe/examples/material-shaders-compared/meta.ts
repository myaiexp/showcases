// aframe example: material: standard, phong and flat shaders under the same light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: standard, phong and flat shaders under the same light",
  summary: "The same torus knot with shader: standard, phong and flat. Standard and phong react to the point light that circles them; flat is a MeshBasicMaterial that ignores lighting. Phong adds specular and shininess.",
  section: 'Components',
  tags: ["material", "shader", "standard", "phong", "flat", "specular", "shininess", "MeshBasicMaterial"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
