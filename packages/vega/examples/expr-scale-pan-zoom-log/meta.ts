// vega example: Expressions: panLog and zoomLog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: panLog and zoomLog",
  summary:
    "The same drag and wheel gestures on a log-scaled x axis: panLog and zoomLog keep the shift and the zoom proportional on a logarithmic domain from 1 to 1000.",
  section: 'Expressions',
  tags: ["expression.panLog","expression.zoomLog","scale.type","signal.on.between"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/scales.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
