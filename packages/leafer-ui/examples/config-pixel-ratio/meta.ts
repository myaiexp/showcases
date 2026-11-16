// leafer-ui example: Config: pixelRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: pixelRatio",
  summary:
    "pixelRatio is the number of canvas pixels per CSS pixel (the device ratio by default). Lower values give a coarse, fast canvas; higher ones a sharper one. leafer.pixelRatio can be assigned while running.",
  section: "App & engine config",
  tags: ['Leafer', 'pixelRatio', 'canvas'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/canvas.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
