// leafer-ui example: Opacity: a Group fades its children as one unit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opacity: a Group fades its children as one unit",
  summary: "opacity on a Group treats the children as a single picture, so overlapping children do not show through each other; opacity on each child does. The left pane sets it on the Group, the right pane on both children.",
  section: "Appearance",
  tags: ["opacity","Group","Rect"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/opacity.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
