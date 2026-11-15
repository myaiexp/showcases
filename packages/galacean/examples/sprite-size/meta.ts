// galacean example: Sprite and renderer size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite and renderer size",
  summary:
    "A sprite defaults to texture pixels divided by 100 world units; SpriteRenderer width and height override that per renderer. Sliders also change the shared sprite width.",
  section: "2D",
  tags: ['Sprite', 'width', 'height', 'SpriteRenderer'],
  docs: [
    'repo/docs/en/graphics/2D/sprite.mdx',
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
