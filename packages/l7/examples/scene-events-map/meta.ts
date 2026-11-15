// l7 example: Map events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map events",
  summary:
    "movestart, mapmove and moveend fire around a pan; zoomstart, zoomchange and zoomend around a zoom. Each chip flashes and counts when its event fires.",
  section: 'Scene',
  tags: ["movestart", "mapmove", "moveend", "zoomstart", "zoomchange", "zoomend"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
