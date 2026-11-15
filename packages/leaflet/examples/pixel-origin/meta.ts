// leaflet example: The pixel origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The pixel origin",
  summary:
    `Leaflet positions layers relative to a pixel origin that is reset after each zoom and not on pans. The orange bracket marks the layer point 0, 0, where the origin sat at the last zoomend or viewreset; panning drags the bracket along with the map pane while getPixelOrigin stays the same, and zooming resets both. The readout shows the origin, the pixel bounds, the map pane offset and a marker's absolute and layer pixel coordinates.`,
  section: "Extending Leaflet",
  tags: ["getPixelOrigin", "getPixelBounds", "project", "latLngToLayerPoint", "layerPointToLatLng", "DivIcon", "zoomend", "viewreset"],
  docs: [
    'repo/docs/examples/extending-2-layers/index.md',
    'repo/src/map/Map.js',
    'repo/src/layer/marker/DivIcon.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
