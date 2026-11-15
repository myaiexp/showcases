// leaflet example: DomEvent.stopPropagation on a Leaflet event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomEvent.stopPropagation on a Leaflet event",
  summary:
    `A marker with bubblingPointerEvents set to true passes its click on to the map as a map click. Given a Leaflet event, DomEvent.stopPropagation stops the map from handling the original DOM event, so the map's click listener never runs for that marker. A toggle switches the call on and off; the counters show marker clicks against map clicks.`,
  section: "Utilities & DOM",
  tags: ["DomEvent.stopPropagation", "DomEvent.stop", "Marker", "bubblingPointerEvents", "click"],
  docs: ["repo/src/dom/DomEvent.js", "repo/src/layer/marker/Marker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
