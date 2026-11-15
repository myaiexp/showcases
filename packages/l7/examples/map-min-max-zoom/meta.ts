// l7 example: minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "minZoom and maxZoom",
  summary:
    "The Map is built with minZoom 2 and maxZoom 5, so setZoom asking for 0 or 8 stops at the limits; the panel shows the asked and the actual zoom.",
  section: 'Map',
  tags: ["minZoom", "maxZoom", "setZoom", "getZoom"],
  docs: ["repo/site/docs/api/map/map.en.md", "repo/site/docs/api/common/map.en.md", "repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
