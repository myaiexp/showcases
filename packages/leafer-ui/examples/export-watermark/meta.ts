// leafer-ui example: Export: draw a watermark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export: draw a watermark",
  summary:
    "The onCanvas hook receives the export canvas before it is encoded: scale the context by pixelRatio and draw on it. Here it stamps a corner mark, and the result is shown.",
  section: "Basics",
  tags: ['Rect', 'export', 'onCanvas', 'pixelRatio'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/export.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
