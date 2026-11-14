// g6 example: Coordinates: client, viewport and canvas side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinates: client, viewport and canvas side by side',
  summary: 'The pointer position in client, viewport and canvas coordinates at once, converted both ways with the four coordinate methods. Pan or zoom the canvas and the viewport and canvas numbers part.',
  section: 'API',
  tags: ['getCanvasByClient', 'getCanvasByViewport', 'getClientByCanvas', 'getViewportByCanvas', 'getPosition'],
  docs: [
    'repo/packages/site/docs/api/coordinate.en.md',
    'repo/packages/site/docs/manual/further-reading/coordinate.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
