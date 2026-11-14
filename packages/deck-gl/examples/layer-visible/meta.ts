// deck-gl example: Layer visible prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer visible prop",
  summary:
    "Two layers stay in the list while checkboxes flip their visible prop, which keeps layer state instead of rebuilding it like conditional rendering.",
  section: "Using layers",
  tags: ["visible", "ArcLayer", "ScatterplotLayer"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
