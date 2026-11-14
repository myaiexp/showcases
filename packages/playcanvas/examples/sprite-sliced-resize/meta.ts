// PlayCanvas: Sliced sprite resizing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sliced sprite resizing",
  summary:
    "A 9-slice frame has a 16 pixel border on each side, and a sprite in Sliced render mode keeps the corners at their own size while the centre and edges stretch to the component width and height. The panel animates its size; the full view also changes pixelsPerUnit, which scales the borders.",
  section: "2D",
  tags: ["SPRITE_RENDERMODE_SLICED","Sprite","pixelsPerUnit","width","height","border"],
  docs: ["repo/docs/user-manual/2D/9-slicing.md","repo/docs/user-manual/editor/scenes/components/sprite.md","repo/docs/user-manual/2D/sprite-editor.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
