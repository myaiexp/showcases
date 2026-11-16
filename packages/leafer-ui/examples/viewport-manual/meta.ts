// leafer-ui example: Viewport: set x, y and scale by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewport: set x, y and scale by hand",
  summary:
    "A Leafer's viewport is its x, y and scale (App: app.zoomLayer or app.tree): assigning them pans and zooms the view. The sliders write them directly; the card animates them.",
  section: "App & Engine",
  tags: ['Leafer', 'x', 'y', 'scale', 'zoomLayer'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/viewport.md', 'pages/www-leaferjs-com/ui/en/reference/display/App.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
