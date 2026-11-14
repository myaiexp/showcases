// PlayCanvas: Image element sprites, sliced and tiled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image element sprites, sliced and tiled",
  summary:
    "An image element can draw a sprite. With a Sliced or Tiled sprite and one pixel per unit, a 16 pixel border is 16 screen units wide at any element size, and pixelsPerUnit on the element rescales it. Two panels share one atlas and one animated size.",
  section: "User Interface",
  tags: ["sprite","pixelsPerUnit","SPRITE_RENDERMODE_SLICED","SPRITE_RENDERMODE_TILED","TextureAtlas"],
  docs: ["repo/docs/user-manual/user-interface/image-elements.md","repo/docs/user-manual/2D/9-slicing.md","repo/docs/user-manual/editor/scenes/components/element.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
