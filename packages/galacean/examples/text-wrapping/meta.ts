// galacean example: Text wrapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text wrapping",
  summary:
    "With enableWrapping a long sentence breaks into lines at the renderer width; the width changes over time and a slider and checkbox control it in the full view.",
  section: "2D",
  tags: ['enableWrapping', 'width', 'TextRenderer'],
  docs: [
    'repo/docs/en/graphics/2D/text.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
