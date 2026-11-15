// galacean example: Text overflow mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text overflow mode",
  summary:
    "Two boxes holding seven lines: OverflowMode.Overflow sizes the layout to the text, Truncate keeps the set height, so with Center or Bottom alignment the two place the same text differently. The card cycles verticalAlignment; sliders and a select are in the full view.",
  section: "2D",
  tags: ['OverflowMode', 'overflowMode', 'height', 'verticalAlignment'],
  docs: [
    'repo/docs/en/graphics/2D/text.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
