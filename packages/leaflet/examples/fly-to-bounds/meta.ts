// leaflet example: flyToBounds to a country
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "flyToBounds to a country",
  summary:
    "Buttons fit the map to the bounds of Italy, Japan, Brazil, Finland and Egypt (drawn as dashed Rectangles) with flyToBounds(bounds, {padding}). A select swaps in fitBounds with the same arguments to compare the flight with the plain fit.",
  section: "Map view",
  tags: ["flyToBounds", "fitBounds", "padding", "Rectangle", "LatLngBoundsExpression"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/vector/Rectangle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
