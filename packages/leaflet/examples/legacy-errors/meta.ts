// leaflet example: What Leaflet 1.x code does in Leaflet 2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "What Leaflet 1.x code does in Leaflet 2",
  summary:
    `Three 1.x habits fail on purpose in 2.0, each with a message pointing at the fix: a class that still has an initialize() method throws when constructed, Draggable's old third argument preventOutline throws when it is a boolean, and setting defaults on Marker.prototype.options fails because options now live in static defaultOptions. Buttons run each attempt, show the error in a popup, then run the 2.0 spelling beside it.`,
  section: "Extending Leaflet",
  tags: ["Class", "initialize", "Draggable", "Marker.mergeOptions", "static defaultOptions", "Popup"],
  docs: [
    'repo/MIGRATION.md',
    'repo/src/core/Class.js',
    'repo/src/dom/Draggable.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
