// leafer-ui example: Config: smooth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: smooth",
  summary:
    "smooth decides whether images and Canvas elements are drawn smoothed. A 6 x 6 image blown up ten times shows it: smooth blends the pixels, no smoothing keeps hard edges. To change it live, set leafer.canvas.smooth and call forceRender().",
  section: "App & engine config",
  tags: ['Leafer', 'smooth', 'canvas', 'forceRender', 'Image'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
