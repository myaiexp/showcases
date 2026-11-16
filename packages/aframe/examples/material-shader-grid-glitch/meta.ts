// aframe example: material: a GLSL shader with a time uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: a GLSL shader with a time uniform",
  summary: "The docs' grid-glitch shader: the vertex shader passes UVs along, and the fragment shader mixes a UV-modulus grid with the colour uniform using sin(time). The timeMsec uniform of type time is filled by A-Frame every frame, so no tick handler is needed.",
  section: 'Components',
  tags: ["registerShader", "vertexShader", "fragmentShader", "type: time", "timeMsec", "uniform", "GLSL", "color"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
