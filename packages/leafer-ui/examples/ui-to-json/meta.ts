// leafer-ui example: UI: toJSON and toString
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI: toJSON and toString",
  summary:
    "toJSON() gives an element's data as a plain object with its tag, toString() as a string, and UI.one(json) builds an element back from it. The copy on the right comes from the left one's JSON.",
  section: "Elements",
  tags: ['toJSON', 'toString', 'UI.one', 'UI'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/UI.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
