// leafer-ui example: Export: screenshot the whole canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export: screenshot the whole canvas",
  summary:
    "leafer.export(\"png\", { screenshot: true }) captures what the engine canvas currently shows, background included. Drag the shapes and capture again.",
  section: "Basics",
  tags: ['Leafer', 'export', 'screenshot'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/export.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
