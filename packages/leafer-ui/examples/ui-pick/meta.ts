// leafer-ui example: UI: pick by point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI: pick by point",
  summary:
    "leafer.pick({ x, y }) returns the topmost element under a world point (target and the path of parents). A fake pointer wanders across three overlapping shapes and the caption names the one it hit.",
  section: "Elements",
  tags: ['pick', 'UI', 'PointerEvent'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/UI.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
