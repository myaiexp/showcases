// PlayCanvas example: Material environment and Use Skybox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material environment and Use Skybox",
  summary:
    "Four identical spheres: one lit by the scene sky, one with its own sunset envAtlas, one with useSkybox off, and one tuned with reflectivity and an ambient tint. The scene environment is replaced completely by a material's own.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "envAtlas", "useSkybox", "reflectivity", "ambient", "EnvLighting"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md", "repo/docs/user-manual/graphics/physical-rendering/image-based-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
