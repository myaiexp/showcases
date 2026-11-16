// leafer-ui example: Custom: registerUI and the tag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: registerUI and the tag",
  summary:
    "The first step of a custom element: subclass Rect, give it a unique __tag and call registerUI(). Registration lets toJSON() carry the tag and UI.one(json) build the right class back. A copy is rebuilt from JSON every second.",
  section: "Custom elements",
  tags: ['registerUI', '__tag', 'toJSON', 'UI.one'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/base/register.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
