// galacean example: Tiled draw mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiled draw mode",
  summary:
    "A small tile repeated across a wide renderer: SpriteTileMode.Continuous cuts the last tile off, Adaptive stretches the tiles to fit. The width changes over time, with a slider in the full view.",
  section: "2D",
  tags: ['SpriteDrawMode', 'SpriteTileMode', 'tileMode', 'drawMode'],
  docs: [
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
    'repo/docs/en/graphics/2D/sprite.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
