// force-graph example: Container layout: follow the container size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container layout: follow the container size',
  summary:
    'A ResizeObserver watches the container and passes its size to width() and height(), then zoomToFit keeps the graph in view. In the full view the box has a CSS resize corner; in the card the box size is animated.',
  section: 'Container layout',
  tags: ['width', 'height', 'zoomToFit', 'backgroundColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
