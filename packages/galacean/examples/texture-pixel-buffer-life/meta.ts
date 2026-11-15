// galacean example: setPixelBuffer: Game of Life
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setPixelBuffer: Game of Life",
  summary:
    "A 64 by 64 Game of Life where each generation is a Uint8Array of RGBA bytes handed to setPixelBuffer; Point filtering keeps every cell a crisp square. Click the screen in the full view to add life.",
  section: "Texture",
  tags: ['Texture2D.setPixelBuffer', 'TextureFilterMode.Point', 'TextureUsage.Dynamic'],
  docs: [
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
