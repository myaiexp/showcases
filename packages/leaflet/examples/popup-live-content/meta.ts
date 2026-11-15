// leaflet example: Popup update and contentupdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup update and contentupdate",
  summary:
    "A popup that stays open while setPopupContent changes its content every 1.2 seconds. Leaflet re-measures it each time, keeps the tip on the marker, and fires contentupdate, which the log lists.",
  section: "Popups & tooltips",
  tags: ["setPopupContent", "contentupdate", "update", "trackResize"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
