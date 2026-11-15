// l7 example: setMapStatus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setMapStatus",
  summary:
    "setMapStatus switches map interactions on and off: dragEnable, zoomEnable, rotateEnable, doubleClickZoom, keyboardEnable. In the card a ghost keeps dragging, but the map only follows while dragEnable is on.",
  section: 'Scene',
  tags: ["setMapStatus", "dragEnable", "zoomEnable", "rotateEnable", "doubleClickZoom", "keyboardEnable"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
