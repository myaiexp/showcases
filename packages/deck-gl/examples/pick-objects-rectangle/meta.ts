// deck-gl example: pickObjects in a rectangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pickObjects in a rectangle",
  summary:
    "deck.pickObjects collects every point inside a box around the click, with width and height sliders; selected points turn amber.",
  section: "Interactivity",
  tags: ["pickObjects", "x", "y", "width", "height"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
