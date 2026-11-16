// aframe example: shadow: a glTF tree casts onto the ground but does not receive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shadow: a glTF tree casts onto the ground but does not receive",
  summary: "The docs' shadow example with a generated tree in place of tree.gltf: a directional light with castShadow: true, shadow=receive: false on the model so it only casts, and a ground circle with shadow=receive: true. The shadow component applies to the model's meshes as they load.",
  section: 'Components',
  tags: ["shadow", "receive", "cast", "gltf-model", "castShadow", "a-circle"],
  docs: ["repo/docs/components/shadow.md", "repo/docs/components/gltf-model.md", "repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
