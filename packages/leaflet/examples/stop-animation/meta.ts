// leaflet example: stop() ends a flyTo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "stop() ends a flyTo",
  summary:
    "flyTo(Tokyo, 8, {duration: 5}) starts a long flight from London; stop() ends it where the map is and settles on a whole zoom level. The log shows movestart and moveend.",
  section: "Map view",
  tags: ["stop", "flyTo", "movestart", "moveend"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
