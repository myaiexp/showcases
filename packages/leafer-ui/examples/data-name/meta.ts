// leafer-ui example: Data: name with a find function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: name with a find function",
  summary:
    "name labels an element, and find(fn) with a function that returns 1 or 0 keeps the ones whose name matches. The matches get a red outline.",
  section: "Data",
  tags: ["name","find"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/name.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
