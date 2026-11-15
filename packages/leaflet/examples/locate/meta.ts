// leaflet example: map.locate: found and error events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "map.locate: found and error events",
  summary:
    `The mobile tutorial's geolocation: map.locate with setView and maxZoom asks the browser for the user's position, and the map fires locationfound (with latlng and accuracy) or locationerror (with a message). The handlers add a marker with a popup and an accuracy circle, as in the tutorial, and show the error text instead of an alert. The full view has a real Locate button; cards never call locate, because it asks for permission, so they fire both events by hand with a fixed position.`,
  section: "Accessibility & mobile",
  tags: ["locate", "stopLocate", "locationfound", "locationerror", "setView", "maxZoom", "watch", "Circle", "Marker", "LatLng.toBounds"],
  docs: ["repo/docs/examples/mobile/index.md", "repo/src/map/Map.js", "repo/src/geo/LatLng.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
