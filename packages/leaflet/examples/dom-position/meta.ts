// leaflet example: DomUtil.setPosition and getPosition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomUtil.setPosition and getPosition",
  summary:
    `Orange badges are plain divs made with DomUtil.create, appended to the overlay pane and placed with DomUtil.setPosition at each city's layer point. Panning moves the whole pane, so nothing needs updating; zooming resets the pixel origin, so the badges are placed again on zoomend. A toggle swaps in setTransform with a scale, which does not record a position for getPosition.`,
  section: "Utilities & DOM",
  tags: ["DomUtil.create", "DomUtil.setPosition", "DomUtil.getPosition", "DomUtil.setTransform", "latLngToLayerPoint", "getPixelOrigin"],
  docs: ['repo/src/dom/DomUtil.js', 'repo/docs/examples/extending-2-layers/index.md', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
