// deck-gl example: MapLibreOverlay: Tooltip and Picking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MapLibreOverlay: Tooltip and Picking',
  summary:
    'The overlay accepts the Deck props: getTooltip and onClick work on a map whose pointer MapLibre owns, and pickObject is forwarded to Deck, as the cards use to read a city under a map pixel.',
  section: 'Base maps',
  tags: ['MapLibreOverlay', 'getTooltip', 'onClick', 'pickObject', 'pickable'],
  docs: [
    'repo/docs/api-reference/maplibre/overview.md',
    'repo/docs/api-reference/mapbox/mapbox-overlay.md',
    'repo/docs/api-reference/core/deck.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
