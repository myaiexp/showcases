// leaflet example: layer-add-remove-events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "layeradd and layerremove",
  summary:
    "The map fires layeradd and layerremove with the layer that joined or left. Buttons add and remove a marker, a circle and a polygon (Layer.addTo, Layer.remove), and the log lists each event with the layer's class.",
  section: "Map events & conversion",
  tags: ["layeradd", "layerremove", "hasLayer", "addTo", "remove", "Marker", "Circle", "Polygon"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
