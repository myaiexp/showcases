// leaflet example: DivIcon with an HTMLElement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DivIcon with an HTMLElement",
  summary: "A DivIcon whose html option is an HTMLElement: a real button with its own click listener, which Leaflet moves into the icon. keyboard: false leaves the button as the only tab stop, and the marker still fires click.",
  section: "Markers & icons",
  tags: ["DivIcon", "html", "HTMLElement", "keyboard", "Marker"],
  docs: ["repo/src/layer/marker/DivIcon.js", "repo/src/layer/marker/Marker.js", "repo/docs/examples/accessibility/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
