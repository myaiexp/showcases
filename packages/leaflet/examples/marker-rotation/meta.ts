// leaflet example: Marker rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker rotation",
  summary: "The rotation option and setRotation() turn a marker's icon, in degrees clockwise around its icon anchor. A rotated marker hides its shadow, and setRotation(null) removes the rotation and brings the shadow back.",
  section: "Markers & icons",
  tags: ["Marker", "rotation", "setRotation", "getRotation", "DefaultIcon", "Icon"],
  docs: ["repo/src/layer/marker/Marker.js", "repo/MIGRATION.md", "repo/src/layer/marker/Icon.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
