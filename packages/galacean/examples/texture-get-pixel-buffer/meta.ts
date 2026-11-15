// galacean example: getPixelBuffer: reading texels back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getPixelBuffer: reading texels back",
  summary:
    "A hue-by-lightness gradient texture is filled with setPixelBuffer, then getPixelBuffer(x, y, 1, 1, 0, out) reads the texel under a probe back to the CPU. The caption shows the bytes and a swatch; the card moves the probe, the full view follows the mouse.",
  section: "Texture",
  tags: ['Texture2D.getPixelBuffer', 'Texture2D.setPixelBuffer'],
  docs: [
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
