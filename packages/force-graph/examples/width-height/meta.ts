// force-graph example: Container layout: width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container layout: width and height',
  summary:
    'width() and height() set the size of the canvas in pixels. The white area is the canvas, so it shrinks and grows inside the pane as the values change; zoomToFit brings the graph back into the new frame.',
  section: 'Container layout',
  tags: ['width', 'height', 'backgroundColor', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
