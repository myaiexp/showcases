// leafer-ui example: Remove: destroy the engine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Remove: destroy the engine",
  summary:
    "leafer.destroy() tears the whole engine down (asynchronously by default; destroy(true) is synchronous). The example destroys it and builds a new one on a cycle.",
  section: "Basics",
  tags: ['Leafer.destroy', 'destroy'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/remove.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
