// PlayCanvas example: Cubemap face data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cubemap face data",
  summary:
    "A cubemap built from six labelled faces in the documented order, reflected by a mirror ball and laid out as a cross by the TextureRenderer, with the +Z face rewritten every frame through lock({ face }).",
  section: "Graphics",
  tags: ["Texture", "cubemap", "levels", "lock", "unlock", "TextureRenderer", "StandardMaterial", "cubeMap"],
  docs: ["repo/docs/user-manual/graphics/textures.md", "repo/docs/user-manual/graphics/debug-drawing.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
