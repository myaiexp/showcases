// l7 example: Mouse events on the scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mouse events on the scene",
  summary:
    "mousemove, mousedown, mouseup, click, dblclick and contextmenu fire anywhere on the map, with the pointer's lngLat. Double-click zoom is switched off with setMapStatus so dblclick leaves the map still.",
  section: 'Scene',
  tags: ["mousemove", "mousedown", "mouseup", "click", "dblclick", "contextmenu"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
