// leafer-ui example: Export: an element as an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Export: an element as an image",
  summary:
    "With @leafer-in/export, rect.export(\"png\") renders the element to an image. The docs pass a file name (rect.export(\"test.png\")), which downloads; here the result's data URL is shown in the page.",
  section: "Basics",
  tags: ['Rect', 'export', '@leafer-in/export'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/export.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
