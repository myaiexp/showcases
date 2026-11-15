// galacean example: Sprite mask influence layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite mask influence layers",
  summary:
    "Three sprites on mask layers 0, 1 and 2 and a star mask sliding across them: the mask only clips a sprite whose maskLayer meets SpriteMask.influenceLayers, other sprites stay whole. Cards cycle the layer sets.",
  section: "2D",
  tags: ['SpriteMask', 'influenceLayers', 'SpriteMaskLayer', 'maskLayer'],
  docs: [
    'repo/docs/en/graphics/2D/spriteMask.mdx',
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
