// deck-gl example: MapLibreOverlay: Depth Against Map 3D
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MapLibreOverlay: Depth Against Map 3D',
  summary:
    'Interleaved mode shares the depth buffer: deck.gl arcs pass in front of and behind MapLibre fill-extrusion blocks, which no overlaid canvas can do; antialiasing: true smooths the arcs in the map context.',
  section: 'Base maps',
  tags: ['MapLibreOverlay', 'interleaved', 'ArcLayer', 'antialiasing', 'fill-extrusion'],
  docs: [
    'repo/docs/api-reference/maplibre/overview.md',
    'repo/docs/get-started/using-with-map.md',
    'repo/docs/developer-guide/base-maps/using-with-maplibre.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
