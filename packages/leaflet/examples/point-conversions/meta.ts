// leaflet example: point-conversions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Container, layer and pixel points",
  summary:
    "One marker's position in three pixel systems while the map pans: latLngToContainerPoint changes, latLngToLayerPoint and project stay the same until the view resets. getPixelOrigin and containerPointToLatLng are shown beside them.",
  section: "Map events & conversion",
  tags: ["latLngToContainerPoint", "latLngToLayerPoint", "project", "getPixelOrigin", "containerPointToLatLng"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
