// force-graph example: Interaction: onZoom and onZoomEnd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onZoom and onZoomEnd',
  summary:
    'onZoom reports the view transform {k, x, y} while it changes and onZoomEnd when it settles. They fire for the wheel and drags as well as for programmatic zoom() and centerAt(), which the card drives.',
  section: 'Interaction',
  tags: ['onZoom', 'onZoomEnd', 'zoom', 'centerAt'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
