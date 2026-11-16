// leafer-ui example: Export: binary data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export: binary data",
  summary:
    "export(\"png\", true) resolves to a Blob instead of a data URL (the second argument true means binary). The Blob's size is printed and shown through an object URL.",
  section: "Basics",
  tags: ['Rect', 'export', 'blob', 'binary'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/export.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
