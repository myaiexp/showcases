// leaflet example: Popup close button label and translate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup close button label and translate",
  summary:
    "The map's translate option turns the close button's default label into another language, and closeButtonLabel gives one popup its own label. The panel lists the aria-label each popup's close button got.",
  section: "Popups & tooltips",
  tags: ["translate", "closeButtonLabel", "popupopen", "bindPopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/map/Map.js", "repo/docs/examples/accessibility/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
