// leaflet example: Popup content: string, element, fragment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup content: string, element, fragment",
  summary:
    "Three markers whose popups hold an HTML string, an element filled with textContent (so tags show as typed text), and a DocumentFragment. Shows what bindPopup accepts as content and which kind is safe for text you did not write.",
  section: "Popups & tooltips",
  tags: ["bindPopup", "OverlayContent", "HTMLElement", "DocumentFragment", "textContent"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
