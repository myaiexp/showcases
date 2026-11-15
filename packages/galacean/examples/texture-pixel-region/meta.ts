// galacean example: setPixelBuffer on a region: painting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setPixelBuffer on a region: painting",
  summary:
    "Only a sub-rectangle of a texture is overwritten: every brush dab is a small RGBA block passed to setPixelBuffer with x, y, width and height. The card paints a spiral on its own; drag on the canvas in the full view.",
  section: "Texture",
  tags: ['Texture2D.setPixelBuffer', 'mipLevel', 'x', 'y', 'width', 'height'],
  docs: [
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
