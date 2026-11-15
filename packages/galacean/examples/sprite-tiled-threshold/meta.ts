// galacean example: Tiled adaptive threshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiled adaptive threshold",
  summary:
    "Three Adaptive tiled rows with tiledAdaptiveThreshold 0.1, 0.5 and 0.9 grow together: the threshold decides when a leftover partial tile is stretched away or kept as an extra tile.",
  section: "2D",
  tags: ['tiledAdaptiveThreshold', 'SpriteTileMode.Adaptive', 'SpriteDrawMode.Tiled'],
  docs: [
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
    'repo/docs/en/graphics/2D/sprite.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
