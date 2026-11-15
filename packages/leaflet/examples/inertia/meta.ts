// leaflet example: Panning inertia
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Panning inertia",
  summary:
    "Drag the map and release while moving: with inertia on it keeps gliding. Sliders set inertiaDeceleration, inertiaMaxSpeed and easeLinearity, a toggle turns inertia off, and an orange line traces the path of the centre. The card scripts a quick flick with each setting.",
  section: "Map interaction",
  tags: ["inertia", "inertiaDeceleration", "inertiaMaxSpeed", "easeLinearity", "dragend", "dragstart", "Polyline"],
  docs: ["repo/src/map/Map.js", "repo/MIGRATION.md", "repo/src/map/handler/DragHandler.js", "repo/src/layer/vector/Polyline.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
