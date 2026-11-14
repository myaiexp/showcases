// deck-gl example: MapLibreOverlay: beforeId Layer Order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MapLibreOverlay: beforeId Layer Order',
  summary:
    'In interleaved mode a deck.gl layer carries a beforeId: translucent discs slot under the land, the borders, the city dots, or above everything, and setProps moves them between the map style layers.',
  section: 'Base maps',
  tags: ['MapLibreOverlay', 'beforeId', 'interleaved', 'setProps', 'ScatterplotLayer'],
  docs: [
    'repo/docs/api-reference/maplibre/overview.md',
    'repo/docs/developer-guide/base-maps/using-with-maplibre.md',
    'repo/docs/api-reference/mapbox/mapbox-overlay.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
