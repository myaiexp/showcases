// PlayCanvas example: Specular workflow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Specular workflow",
  summary:
    "The specular workflow: useMetalness off, a specular colour from none through grey to a gold tint, on a coloured and a black-diffuse row. The full view varies gloss and switches the same spheres to the metalness workflow.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "useMetalness", "specular", "gloss", "diffuse"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/index.md", "repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
