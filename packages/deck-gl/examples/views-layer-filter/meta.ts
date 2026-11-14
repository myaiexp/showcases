// deck-gl example: layerFilter per view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "layerFilter per view",
  summary:
    "City names draw only in the left view and population bubbles only in the right, chosen by Deck's layerFilter and toggled with checkboxes.",
  section: "Views",
  tags: ["layerFilter", "viewport.id", "views"],
  docs: ["repo/docs/developer-guide/views.md", "repo/docs/api-reference/core/view.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
