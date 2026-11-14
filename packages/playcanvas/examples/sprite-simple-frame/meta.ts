// PlayCanvas: Simple sprite frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simple sprite frames",
  summary:
    "A simple sprite component shows one frame of a texture atlas. A canvas-drawn atlas holds eight frames; one sprite asset serves nine entities, the big one changing its frame index while a row below shows every frame. The full view picks the frame with a slider.",
  section: "2D",
  tags: ["SpriteComponent","type","frame","TextureAtlas","Sprite"],
  docs: ["repo/docs/user-manual/editor/scenes/components/sprite.md","repo/docs/user-manual/2D/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
