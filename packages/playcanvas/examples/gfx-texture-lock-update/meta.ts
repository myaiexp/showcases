// PlayCanvas example: Updating texture data every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Updating texture data every frame",
  summary:
    "A plasma written into one texture through lock() and unlock(), and into another by drawing on a canvas and calling setSource(), side by side. The full view shows the fill-and-upload time and can pause.",
  section: "Graphics",
  tags: ["Texture", "lock", "unlock", "setSource"],
  docs: ["repo/docs/user-manual/graphics/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
