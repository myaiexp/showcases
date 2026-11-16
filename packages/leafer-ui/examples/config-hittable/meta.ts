// leafer-ui example: Config: hittable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: hittable",
  summary:
    "hittable: false makes the whole canvas ignore pointer hits: nothing can be dragged or hovered. It can be switched at runtime with leafer.hittable. The card tries to drag the square in both states.",
  section: "App & engine config",
  tags: ['Leafer', 'hittable', 'draggable'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/canvas.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
