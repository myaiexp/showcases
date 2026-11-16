// aframe example: material: a shader plus a component that feeds it a uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: a shader plus a component that feeds it a uniform",
  summary: "A custom shader displaces vertices with a time uniform and a myOffset vec3 uniform. A component copies the camera position into material.myOffset each tick with the three-argument setAttribute, as the docs advise, so the ripples drift as you move with WASD.",
  section: 'Components',
  tags: ["registerShader", "vec3", "myOffset", "uniform", "type: time", "setAttribute", "tick", "camera", "vertexShader"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
