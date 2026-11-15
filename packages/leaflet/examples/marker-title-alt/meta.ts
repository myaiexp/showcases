// leaflet example: Marker title and alt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker title and alt",
  summary: "The title and alt marker options. alt becomes the alt attribute of the icon image (default 'Marker') and title the browser tooltip; either one is the marker's accessible name. The panel lists what Leaflet put on four markers.",
  section: "Markers & icons",
  tags: ["Marker", "title", "alt", "getElement"],
  docs: [
    'repo/src/layer/marker/Marker.js',
    'repo/docs/examples/accessibility/index.md',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
