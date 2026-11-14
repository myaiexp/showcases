// deck-gl example: Click to select
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Click to select",
  summary:
    "A layer onClick stores the picked index; the accessor reads it and updateTriggers recolours the selected city.",
  section: "Interactivity",
  tags: ["onClick", "PickingInfo", "updateTriggers", "selection"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
