// leafer-ui example: Hit: hitFill pixel skips transparent image pixels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitFill pixel skips transparent image pixels",
  summary: "On an SVG or PNG image, hitFill: \"pixel\" tests the actual pixel, so the transparent rounded corners no longer count. The card drags from a corner with \"path\" and then \"pixel\".",
  section: "Interaction",
  tags: ["hitFill","pixel","Image","svg"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hitFill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
