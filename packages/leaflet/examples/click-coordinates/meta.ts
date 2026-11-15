// leaflet example: click-coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Click for coordinates",
  summary:
    "One Popup object is reused for every click on the map: map.on('click') passes the clicked latlng, and openOn(map) moves the popup there and closes the previous one. The card clicks the map by itself.",
  section: "Map events & conversion",
  tags: ["LeafletMap", "Popup", "map.on('click')", "openOn", "setLatLng", "setContent"],
  docs: ["repo/docs/examples/quick-start/index.md", "repo/src/map/Map.js", "repo/src/layer/Popup.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
