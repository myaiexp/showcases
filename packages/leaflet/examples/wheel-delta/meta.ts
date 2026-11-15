// leaflet example: DomEvent.getWheelDelta
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomEvent.getWheelDelta",
  summary:
    `Wheel events report their size in pixels, lines or pages depending on the device. DomEvent.getWheelDelta turns each into vertical pixels, negative when scrolling down, with a guess of 60 for line and page scrolling. A listener on the map container logs the raw deltaY and deltaMode next to the normalised value; the map zooms from the same wheel events as usual.`,
  section: "Utilities & DOM",
  tags: ["DomEvent.getWheelDelta", "DomEvent.on", "wheel", "scrollWheelZoom"],
  docs: ['repo/src/dom/DomEvent.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
