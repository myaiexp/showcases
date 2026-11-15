// leaflet example: Draggable marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Draggable marker",
  summary: "A marker with draggable: true, logging dragstart, drag and dragend. With autoPan the map pans when the marker is dragged within autoPanPadding of the edge. Toggles call marker.dragging.enable() and disable(); a focused marker also moves with the arrow keys.",
  section: "Markers & icons",
  tags: ["Marker", "draggable", "autoPan", "autoPanPadding", "autoPanSpeed", "dragging.enable", "dragstart", "drag", "dragend"],
  docs: ["repo/src/layer/marker/Marker.js", "repo/src/layer/marker/Marker.Drag.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
