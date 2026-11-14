// PlayCanvas: Atlas frames from JSON data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Atlas frames from JSON data",
  summary:
    "Texture packing puts many images in one texture and lists their rectangles in frame data. Packed art is drawn on a canvas, a JSON-hash style description is converted into atlas frames (flipping y to the atlas's bottom-left origin), and each named frame becomes its own sprite.",
  section: "2D",
  tags: ["TextureAtlas","frames","Sprite","frameKeys","rect","pivot"],
  docs: ["repo/docs/user-manual/2D/texture-packing.md","repo/docs/user-manual/2D/sprite-editor.md","repo/docs/user-manual/2D/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
