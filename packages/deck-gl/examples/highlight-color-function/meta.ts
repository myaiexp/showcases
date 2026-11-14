// deck-gl example: highlightColor as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "highlightColor as a function",
  summary:
    "With autoHighlight, highlightColor is a function of the picking info: big cities glow red, mid-size yellow and small ones cyan.",
  section: "Interactivity",
  tags: ["highlightColor", "autoHighlight", "PickingInfo"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/interactivity.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
