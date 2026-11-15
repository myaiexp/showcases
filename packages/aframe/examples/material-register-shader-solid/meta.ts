// aframe example: material: registerShader with a colour and opacity uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: registerShader with a colour and opacity uniform",
  summary: "The docs' first custom shader: a schema with color and opacity marked is: 'uniform', and a fragment shader that writes vec4(color, opacity). A box uses it as material=shader: my-custom, and its properties can be changed like any material's.",
  section: 'Components',
  tags: ["registerShader", "schema", "is: uniform", "fragmentShader", "raw", "material", "shader", "uniform"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
