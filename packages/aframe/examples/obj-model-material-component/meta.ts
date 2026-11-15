// aframe example: obj-model: skip the MTL and use the material component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "obj-model: skip the MTL and use the material component",
  summary: "The mtl property is optional when a material component styles the model instead. Three copies of one generated OBJ gem, loaded from an inline url() path, get a flat colour, a wireframe and a metallic standard material, applied to every mesh in the model.",
  section: 'Components',
  tags: ["obj-model", "obj", "material", "url()", "wireframe", "metalness", "flat"],
  docs: ["repo/docs/components/obj-model.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
