// leaflet example: flyTo between cities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "flyTo between cities",
  summary:
    "Buttons fly the map between London, Tokyo, Sydney, Rio de Janeiro and Nairobi with flyTo(latlng, zoom, {duration}), which zooms out, pans and zooms back in. A slider sets the duration (0 lets Leaflet choose), and the caption counts the animation frames, which the move event marks with flyTo: true.",
  section: "Map view",
  tags: ["flyTo", "duration", "move", "flyTo: true", "moveend"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
