// PlayCanvas: Sprite render modes compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite render modes compared",
  summary:
    "The three render modes of a sprite, Simple, Sliced and Tiled, drawn from the same panel frame at the same changing size. Simple scales the whole frame, Sliced keeps its borders and stretches the middle, Tiled keeps its borders and repeats the middle.",
  section: "2D",
  tags: ["SPRITE_RENDERMODE_SIMPLE","SPRITE_RENDERMODE_SLICED","SPRITE_RENDERMODE_TILED","Sprite"],
  docs: ["repo/docs/user-manual/2D/9-slicing.md","repo/docs/user-manual/2D/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
