// vchart example: API: geoZoomByIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: geoZoomByIndex',
  summary:
    'geoZoomByIndex(regionIndex, zoom, center) zooms a geo region from code, with the zoom centre in canvas pixels. Buttons zoom in, out and reset around the map\'s middle; the card zooms in and out in a loop.',
  section: 'API',
  tags: ['geoZoomByIndex', 'geoZoomById', 'roam', 'map', 'zoom'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
