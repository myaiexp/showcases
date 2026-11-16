// leafer-ui example: Pen: clearPath and clear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pen: clearPath and clear",
  summary:
    "clearPath() (alias beginPath) wipes only the path since the last setStyle; clear() removes and destroys everything. The loop draws three shapes, then clearPath, then clear.",
  section: "Elements",
  tags: ['Pen', 'clearPath', 'clear', 'setStyle'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Pen.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
