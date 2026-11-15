// leaflet example: Marker pointer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker pointer events",
  summary: "Every pointer event a marker fires, in order: pointerover, pointerdown, pointerup, preclick, click, dblclick, contextmenu, pointerout, each logged with the pointer's latlng. The card sends those events to the icon itself.",
  section: "Markers & icons",
  tags: ["Marker", "pointerover", "pointerdown", "pointerup", "preclick", "click", "dblclick", "contextmenu", "pointerout"],
  docs: ['repo/src/layer/Layer.js', 'repo/src/layer/marker/Marker.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
