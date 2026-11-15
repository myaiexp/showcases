// 3d-force-graph example: Container layout: width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container layout: width and height',
  summary:
    'width and height set the canvas size in pixels and default to the window. The sliders resize the graph inside a fixed frame; the card steps through a few sizes and the camera refits each time.',
  section: 'Container layout',
  tags: ['width', 'height', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
