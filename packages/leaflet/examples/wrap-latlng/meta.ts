// leaflet example: wrap-latlng
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "wrapLatLng and wrapLatLngBounds",
  summary:
    "The map repeats east and west. A click on another copy of the world gives an e.latlng with longitude beyond 180; map.wrapLatLng() folds it back into -180 to 180. A box beyond the dateline is wrapped with wrapLatLngBounds.",
  section: "Map events & conversion",
  tags: ["wrapLatLng", "wrapLatLngBounds", "LatLngBounds", "Rectangle", "CircleMarker", "click"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
