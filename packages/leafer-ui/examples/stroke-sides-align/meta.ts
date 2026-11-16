// leafer-ui example: Stroke sides: strokeAlign inside, center or outside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke sides: strokeAlign inside, center or outside",
  summary:
    "The side strokes follow strokeAlign: inside keeps them within the rect, center straddles the edge, outside draws them beyond it. The grey outline marks the rect's own bounds.",
  section: 'Official plugins',
  tags: ["stroke-sides", "strokeWidth", "strokeAlign"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
