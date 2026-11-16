// aframe example: material: a ShaderMaterial created inside a component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: a ShaderMaterial created inside a component",
  summary: "When registerShader lacks a feature, the docs build the material in a component: on the entity's loaded event it assigns a THREE.ShaderMaterial to the mesh, and update() pushes a schema colour into its uniform. A stripe shader scrolls over a torus.",
  section: 'Components',
  tags: ["registerComponent", "ShaderMaterial", "getObject3D", "mesh", "uniforms", "update", "loaded", "THREE"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
