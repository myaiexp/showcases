// deck-gl example: unproject() under the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "unproject() under the pointer",
  summary:
    "Pointer pixels turned into longitude and latitude by unproject() on a pitched map, with a targetZ slider for the plane that is hit.",
  section: "Viewports",
  tags: ["unproject", "targetZ", "WebMercatorViewport"],
  docs: ["repo/docs/api-reference/core/viewport.md", "repo/docs/api-reference/core/web-mercator-viewport.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
