// leafer-ui example: Stroke sides: only the bottom edge, like a tab or a divider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke sides: only the bottom edge, like a tab or a divider",
  summary:
    "A strokeWidth of [0, 0, 4, 0] draws just a bottom line. A Rect row with a bottom stroke makes a list divider, and a tab bar marks the active tab with a thicker one.",
  section: 'Official plugins',
  tags: ["stroke-sides", "strokeWidth", "Rect", "Text"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/stroke-sides/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
