// leafer-ui example: Bright: the editor lifts the selection with a custom dim
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bright: the editor lifts the selection with a custom dim",
  summary: "editor: { bright: true, dimOthers: 0.2 } renders the selected element on top and fades the others to a chosen opacity. A simulated pointer selects the green rect that overlaps the yellow one.",
  section: "Appearance",
  tags: ["bright","dimOthers","editor","App","bright plugin"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/bright.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/dim.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
