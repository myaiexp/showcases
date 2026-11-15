// aframe example: gltf-model: model-error when the file cannot be loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "gltf-model: model-error when the file cannot be loaded",
  summary: "Two entities point gltf-model at a data URL: one holds a real generated glb and emits model-loaded, the other holds bytes that are not glTF and emits model-error. A button swaps the broken one for the good model to show the recovery. The read-out names the event and its entity.",
  section: 'Components',
  tags: ["gltf-model", "model-error", "model-loaded", "data URL", "events"],
  docs: ["repo/docs/components/gltf-model.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
