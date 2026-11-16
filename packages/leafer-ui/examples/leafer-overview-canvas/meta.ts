// leafer-ui example: Leafer: canvas and context, an overview
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Leafer: canvas and context, an overview",
  summary:
    "leafer.canvas.view is the real HTMLCanvasElement. Listening to RenderEvent.END and drawing it onto a small canvas with drawImage gives a live overview, the cheap kind the docs suggest.",
  section: "App & Engine",
  tags: ['Leafer', 'canvas', 'RenderEvent', 'END', 'drawImage'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
