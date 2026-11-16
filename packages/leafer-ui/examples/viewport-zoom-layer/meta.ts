// leafer-ui example: Viewport: a separate zoom layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewport: a separate zoom layer",
  summary:
    "By default the whole Leafer zooms. Assign leafer.zoomLayer = group and only that group pans and zooms: the red rect stays fixed on the screen while the green one moves with the view.",
  section: "App & Engine",
  tags: ['Leafer', 'zoomLayer', 'Group', 'type', 'viewport'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/display/Leafer.md', 'pages/www-leaferjs-com/ui/en/guide/advanced/viewport.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
