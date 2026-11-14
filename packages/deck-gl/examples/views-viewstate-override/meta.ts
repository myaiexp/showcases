// deck-gl example: A view that overrides a shared view state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A view that overrides a shared view state",
  summary:
    "An overview view selects the main view's state by id and pins its zoom, pitch and bearing through its own viewState prop.",
  section: "Views",
  tags: ["View.viewState", "MapView", "clear"],
  docs: ["repo/docs/api-reference/core/view.md", "repo/docs/developer-guide/views.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
