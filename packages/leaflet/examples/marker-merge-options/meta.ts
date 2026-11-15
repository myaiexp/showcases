// leaflet example: Marker defaults through a subclass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker defaults through a subclass",
  summary: "Changing marker defaults the safe way. MIGRATION.md replaces Marker.prototype.options with mergeOptions, but that would restyle every marker on the page, so a PinMarker subclass gets a crimson DefaultIcon and riseOnHover from mergeOptions while plain Markers stay as they were.",
  section: "Markers & icons",
  tags: ["Marker", "mergeOptions", "extends", "DefaultIcon", "riseOnHover"],
  docs: ["repo/MIGRATION.md", "repo/src/layer/marker/Marker.js", "repo/src/layer/marker/DefaultIcon.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
