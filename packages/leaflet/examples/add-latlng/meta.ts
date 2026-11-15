// leaflet example: Add latlng
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Add latlng",
  summary:
    "Clicking the map calls addLatLng on a Polyline that started empty, so the line grows point by point. The card's pointer is faked.",
  section: "Vector layers",
  tags: ["Polyline", "addLatLng", "setLatLngs", "isEmpty", "getBounds"],
  docs: ['repo/src/layer/vector/Polyline.js', 'repo/src/map/Map.js', 'repo/src/geo/LatLngBounds.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
