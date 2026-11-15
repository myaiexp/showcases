// leaflet example: Marker toGeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker toGeoJSON",
  summary: "marker.toGeoJSON(precision) returns the marker as a GeoJSON Point Feature with longitude first, rounded to the given number of decimals (6 by default, false for none). Drag the marker and watch the Feature change.",
  section: "Markers & icons",
  tags: ["Marker", "toGeoJSON", "draggable", "move"],
  docs: ["repo/src/layer/marker/Marker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
