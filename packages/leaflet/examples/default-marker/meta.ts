// leaflet example: Default marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Default marker",
  summary: "A Marker created with only a position, so it uses the DefaultIcon pin. The panel reads the icon's size and anchors, and what the icon element is in the page: an <img> with an inline SVG data URI, tabindex 0 and role button.",
  section: "Markers & icons",
  tags: ["Marker", "DefaultIcon", "getIcon", "getElement", "bindPopup"],
  docs: [
    'repo/src/layer/marker/Marker.js',
    'repo/src/layer/marker/DefaultIcon.js',
    'repo/MIGRATION.md',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
