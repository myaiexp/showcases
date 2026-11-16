// aframe example: gltf-model: load a glb through an <a-asset-item>
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "gltf-model: load a glb through an <a-asset-item>",
  summary: "The docs' pattern: an <a-asset-item> in <a-assets> holds the model, the scene waits for it, and gltf-model=#id on an entity shows it. Three generated models (a toy duck, a tree and a lantern) turn on their spots, and model-loaded fires on each entity as it arrives.",
  section: 'Components',
  tags: ["gltf-model", "a-asset-item", "a-assets", "model-loaded", "selector", "glTF"],
  docs: ["repo/docs/components/gltf-model.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
