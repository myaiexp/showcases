// galacean example: Text with a sprite mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text with a sprite mask",
  summary:
    "A SpriteMask disc slides over a TextRenderer whose maskInteraction cycles None, VisibleInsideMask and VisibleOutsideMask, so the text is clipped like a sprite. A select picks the mode in the full view.",
  section: "2D",
  tags: ['TextRenderer', 'maskInteraction', 'SpriteMask'],
  docs: [
    'repo/docs/en/graphics/2D/text.mdx',
    'repo/docs/en/graphics/2D/spriteMask.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
