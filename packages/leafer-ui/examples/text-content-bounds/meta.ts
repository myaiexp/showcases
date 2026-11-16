// leafer-ui example: Text: content bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: content bounds",
  summary:
    "text.getBounds('content', 'inner') returns the box of the glyphs actually drawn, smaller than the Text box when the text is aligned or short. The red rectangle follows it.",
  section: "Elements",
  tags: ['Text', 'getBounds', 'textAlign', 'width'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Text.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
