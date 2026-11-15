// leaflet example: Control positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Control positions",
  summary:
    "Four controls (zoom, scale, fullscreen, attribution) each moved between the four corners with setPosition; getPosition reads the corner back. Selects in the full view, one control per step in the card.",
  section: "Controls",
  tags: ["Control", "getPosition", "setPosition", "ZoomControl", "ScaleControl", "FullscreenControl", "AttributionControl"],
  docs: ["repo/src/control/Control.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
