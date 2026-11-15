// leaflet example: Popup closeButton and closeOnEscapeKey
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup closeButton and closeOnEscapeKey",
  summary:
    "Three popups: the default with a close button and Escape, one with closeButton false, and one with closeOnEscapeKey false. The card clicks the \u00d7 and presses Escape on each in turn.",
  section: "Popups & tooltips",
  tags: ["closeButton", "closeOnEscapeKey", "bindPopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/docs/examples/accessibility/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
