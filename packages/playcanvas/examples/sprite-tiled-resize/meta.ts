// PlayCanvas: Tiled sprite resizing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiled sprite resizing",
  summary:
    "Tiled render mode repeats the centre and edges of a 9-slice frame instead of stretching them, and leaves the corners alone. A sliced and a tiled sprite share one frame and one animated size so the difference between stretching and repeating is visible.",
  section: "2D",
  tags: ["SPRITE_RENDERMODE_TILED","SPRITE_RENDERMODE_SLICED","Sprite","width","height","border"],
  docs: ["repo/docs/user-manual/2D/9-slicing.md","repo/docs/user-manual/editor/scenes/components/sprite.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
