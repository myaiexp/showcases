// galacean example: Text bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text bounds",
  summary:
    "TextRenderer.bounds reports the box the text really occupies, even with no width or height set; an orange frame is redrawn from it every frame while the font size and text change.",
  section: "2D",
  tags: ['TextRenderer.bounds', 'BoundingBox'],
  docs: [
    'repo/docs/en/graphics/2D/text.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
