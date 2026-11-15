// leaflet example: A static map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A static map",
  summary:
    "A map created with dragging, scrollWheelZoom, doubleClickZoom, boxZoom, keyboard, pinchZoom, tapHold and zoomControl all set to false. Gestures do nothing, while setView from buttons still moves it, and a button turns dragging back on with map.dragging.enable().",
  section: "Map interaction",
  tags: ["dragging", "scrollWheelZoom", "doubleClickZoom", "boxZoom", "keyboard", "pinchZoom", "tapHold", "zoomControl", "setView"],
  docs: ["repo/src/map/Map.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
