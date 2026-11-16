// leafer-ui example: Layout: updateLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: updateLayout",
  summary:
    "Layout is worked out lazily before the next frame, so a bound read right after a change can be old; updateLayout() brings it up to date at once.",
  section: "Layout",
  tags: ["updateLayout","worldBoxBounds"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/layout.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
