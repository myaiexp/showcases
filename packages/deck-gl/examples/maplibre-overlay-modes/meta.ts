// deck-gl example: MapLibreOverlay: Overlaid or Interleaved
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MapLibreOverlay: Overlaid or Interleaved',
  summary:
    'The same ArcLayer through MapLibreOverlay in both modes: overlaid puts Deck on its own canvas above the map, interleaved shares the map canvas; getCanvas shows which, and the mode is rebuilt because it is fixed at construction.',
  section: 'Base maps',
  tags: ['MapLibreOverlay', 'interleaved', 'getCanvas', 'finalize', 'ArcLayer'],
  docs: [
    'repo/docs/api-reference/maplibre/overview.md',
    'repo/docs/developer-guide/base-maps/using-with-maplibre.md',
    'repo/docs/get-started/using-with-map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
