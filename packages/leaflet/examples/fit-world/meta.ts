// leaflet example: fitWorld
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fitWorld",
  summary:
    "fitWorld() zooms out to the biggest zoom at which the whole world fits the map box. A slider changes the box height so you can see the zoom change with the size, and further buttons try fitWorld({maxZoom: 1}) and fitWorld({animate: false}).",
  section: "Map view",
  tags: ["fitWorld", "fitBounds", "getZoom", "getSize", "maxZoom", "animate"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
