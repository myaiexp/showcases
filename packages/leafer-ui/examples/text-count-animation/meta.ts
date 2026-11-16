// leafer-ui example: Text: count animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: count animation",
  summary:
    "When text is a number, animating it counts: animation: { style: { text: 100 }, duration: 2 } counts from 0 to 100 (needs the animate plugin). The card replays it.",
  section: "Elements",
  tags: ['Text', 'text', 'animation', '@leafer-in/animate'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Text.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
