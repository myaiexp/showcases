// deck-gl example: A minimap with a view state per view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A minimap with a view state per view",
  summary:
    "A pitched main map and an overlaid minimap: the minimap follows the main view's centre but keeps its own zoom, through viewState keyed by view id.",
  section: "Views",
  tags: ["viewState", "onViewStateChange", "clear", "clearColor", "MapView"],
  docs: ["repo/docs/developer-guide/views.md", "repo/docs/api-reference/core/view.md", "repo/docs/api-reference/core/map-view.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
