// leafer-ui example: Export: synchronous Base64
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export: synchronous Base64",
  summary:
    "syncExport(\"jpg\") returns the result at once instead of a Promise, provided async images have finished loading. Handy when you cannot await.",
  section: "Basics",
  tags: ['Rect', 'syncExport', 'jpg', 'base64'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/export.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
