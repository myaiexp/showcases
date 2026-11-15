// leaflet example: addEventParent and propagated events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "addEventParent and propagated events",
  summary:
    `Evented objects can pass their events up. Three Sensor objects fire reading with the propagate flag set; a Station that was added as their event parent hears every sensor's reading and learns which sensor it came from in propagatedFrom. Removing the parent from one sensor silences it at the station while the sensor's own listeners still run. Circles on the map light up for each reading.`,
  section: "Extending Leaflet",
  tags: ["Evented", "addEventParent", "removeEventParent", "fire", "propagatedFrom", "listens"],
  docs: ["repo/src/core/Events.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
