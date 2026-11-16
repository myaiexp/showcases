// leafer-ui example: Export: Base64 data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export: Base64 data",
  summary:
    "export(\"jpg\") resolves to an object whose data is a Base64 data URL; the optional second argument is the JPEG quality (default 0.92). The start of the string and its length are printed.",
  section: "Basics",
  tags: ['Rect', 'export', 'jpg', 'quality', 'base64'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/export.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
