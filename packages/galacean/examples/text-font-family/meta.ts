// galacean example: Text system fonts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text system fonts",
  summary:
    "Eight TextRenderers each given a system font with Font.createFromOS: Arial, Georgia, Courier New, Times New Roman, Verdana, Impact, monospace and serif. The full view swaps the font of a sample line.",
  section: "2D",
  tags: ['Font.createFromOS', 'TextRenderer.font'],
  docs: [
    'repo/docs/en/graphics/2D/text.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
