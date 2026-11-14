// deck-gl example: useDevicePixels and the drawing buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'useDevicePixels and the drawing buffer',
  summary:
    "Deck's useDevicePixels prop sets the resolution of the drawing buffer: true uses the device pixel ratio, false uses CSS pixels and a number scales it. The readout shows the canvas buffer size for each choice.",
  section: 'Data and performance',
  tags: ['useDevicePixels', 'resolution', 'performance', 'drawing buffer'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/deck.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
