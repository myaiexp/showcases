// leaflet example: Turning handlers on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Turning handlers on and off",
  summary:
    "One toggle for each map handler (dragging, doubleClickZoom, scrollWheelZoom, boxZoom, keyboard, tapHold, pinchZoom) calling its enable() or disable(), with a panel showing enabled(). The card disables doubleClickZoom and double clicks to show it stop working.",
  section: "Map interaction",
  tags: ["Handler", "enable", "disable", "enabled", "dragging", "doubleClickZoom", "scrollWheelZoom", "boxZoom", "keyboard", "tapHold", "pinchZoom"],
  docs: ["repo/src/core/Handler.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
