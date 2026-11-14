// deck-gl example: Tooltip with html and style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip with html and style",
  summary:
    "getTooltip returns {html, style, className} for hovered columns; the card draws that same object by hand for each highlighted column.",
  section: "Interactivity",
  tags: ["getTooltip", "html", "style", "className", "ColumnLayer"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md", "repo/docs/api-reference/layers/column-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
