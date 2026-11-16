// leafer-ui example: ScrollBar: config.padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ScrollBar: config.padding",
  summary:
    "padding keeps the canvas edges clear: the bars measure the canvas minus the padding. A second later it is set back to 0 and update() redraws the bars.",
  section: "Official plugins",
  tags: ["ScrollBar", "@leafer-in/scroll", "padding", "update"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/scroll.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
