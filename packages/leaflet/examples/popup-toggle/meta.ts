// leaflet example: Popup methods: toggle, set content, unbind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup methods: toggle, set content, unbind",
  summary:
    "Buttons call togglePopup, setPopupContent, unbindPopup and bindPopup on one marker, and the caption reports isPopupOpen() and getPopup() after each. After unbindPopup a click no longer opens anything.",
  section: "Popups & tooltips",
  tags: ["togglePopup", "isPopupOpen", "setPopupContent", "getPopup", "unbindPopup", "bindPopup"],
  docs: ["repo/src/layer/Layer.js", "repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
