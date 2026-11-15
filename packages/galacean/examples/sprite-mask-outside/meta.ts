// galacean example: Sprite mask: visible outside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite mask: visible outside",
  summary:
    "The same star mask with maskInteraction cycling None, VisibleInsideMask and VisibleOutsideMask on the stripes: outside mode cuts a star-shaped hole instead. A select picks the mode in the full view.",
  section: "2D",
  tags: ['SpriteMask', 'SpriteMaskInteraction', 'VisibleOutsideMask'],
  docs: [
    'repo/docs/en/graphics/2D/spriteMask.mdx',
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
