// deck-gl example: Constrain the view state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Constrain the view state",
  summary:
    "onViewStateChange clamps longitude and latitude to a bounding box, drawn as a path, so panning stops at its edge.",
  section: "Interactivity",
  tags: ["onViewStateChange", "viewState", "constraints"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
