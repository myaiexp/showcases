// galacean example: Sprite mask alpha cutoff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite mask alpha cutoff",
  summary:
    "A soft disc as the mask sprite: raising SpriteMask.alphaCutoff discards the fading rim pixels, so the visible window shrinks. A slider sets it in the full view.",
  section: "2D",
  tags: ['SpriteMask', 'alphaCutoff'],
  docs: [
    'repo/docs/en/graphics/2D/spriteMask.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
