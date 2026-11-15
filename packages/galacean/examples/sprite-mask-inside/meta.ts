// galacean example: Sprite mask: visible inside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite mask: visible inside",
  summary:
    "A star-shaped SpriteMask drifts and turns over a striped sprite whose maskInteraction is VisibleInsideMask, so the stripes show only inside the star.",
  section: "2D",
  tags: ['SpriteMask', 'SpriteMaskInteraction.VisibleInsideMask', 'maskInteraction'],
  docs: [
    'repo/docs/en/graphics/2D/spriteMask.mdx',
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
