// deck-gl example: Draggable features
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Draggable features",
  summary:
    "Six handles of a polygon with onDragStart, onDrag and onDragEnd on the layer: info.coordinate moves the dragged point while the controller pan is off.",
  section: "Interactivity",
  tags: ["onDragStart", "onDrag", "onDragEnd", "getCursor", "controller"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/layer.md", "repo/docs/api-reference/core/deck.md", "repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
