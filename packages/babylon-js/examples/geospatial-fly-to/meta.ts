// babylon-js example: Geospatial camera flights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geospatial camera flights',
  summary:
    'GeospatialCamera.flyToAsync animates yaw, pitch, radius and center together to each city, with a CubicEase and a centerHopScale that lifts the path into an arc between distant points. Any argument left undefined keeps its value; double-clicking the globe uses the built-in flyToPointAsync.',
  section: 'Geospatial',
  tags: ['GeospatialCamera', 'flyToAsync', 'centerHopScale', 'flyToPointAsync', 'CubicEase'],
  docs: ['repo/content/features/featuresDeepDive/geospatial/geospatialCamera.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
