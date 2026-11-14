// deck-gl example: getDistanceScales() as a scale bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getDistanceScales() as a scale bar",
  summary:
    "A map scale bar whose length comes from getDistanceScales() and the viewport scale, redrawn as the zoom changes.",
  section: "Viewports",
  tags: ["getDistanceScales", "WebMercatorViewport", "metersPerUnit"],
  docs: ["repo/docs/api-reference/core/web-mercator-viewport.md", "repo/docs/api-reference/core/viewport.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
