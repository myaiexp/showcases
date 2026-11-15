// vega example: Expressions: panPow and zoomPow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: panPow and zoomPow",
  summary:
    "Drag and wheel on a power-scaled x axis whose exponent you slide: panPow and zoomPow take the exponent as their last argument so the gestures stay true to the scale.",
  section: 'Expressions',
  tags: ["expression.panPow","expression.zoomPow","scale.exponent","signal.on.between"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/scales.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
