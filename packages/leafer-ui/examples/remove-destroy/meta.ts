// leafer-ui example: Remove: rect.destroy()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Remove: rect.destroy()",
  summary:
    "rect.destroy() removes the element and frees it for good (remove() then destroy). The example builds a fresh rect each cycle, since a destroyed one cannot return.",
  section: "Basics",
  tags: ['Rect.one', 'destroy'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/remove.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
