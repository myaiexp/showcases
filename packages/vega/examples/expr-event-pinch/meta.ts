// vega example: Expressions: pinchDistance and pinchAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: pinchDistance and pinchAngle",
  summary:
    "A square sized and tilted by a two-finger touch through pinchDistance and pinchAngle, with sliders on the same signals for pointers without touch.",
  section: 'Expressions',
  tags: ["expression.pinchDistance","expression.pinchAngle","signal.on","signal.bind"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
