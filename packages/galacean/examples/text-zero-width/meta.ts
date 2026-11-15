// galacean example: Text wrapping needs a width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text wrapping needs a width",
  summary:
    "The docs warn that enableWrapping without a valid width renders nothing: the card steps through wrapping off, wrapping with width 0 (blank) and wrapping with a width. A button steps in the full view.",
  section: "2D",
  tags: ['enableWrapping', 'width', 'TextRenderer'],
  docs: [
    'repo/docs/en/graphics/2D/text.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
