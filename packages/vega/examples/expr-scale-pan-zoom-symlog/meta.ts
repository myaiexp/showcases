// vega example: Expressions: panSymlog and zoomSymlog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: panSymlog and zoomSymlog",
  summary:
    "Drag and wheel on a symlog x axis spanning negative and positive values, with a slider for the symlog constant that panSymlog and zoomSymlog also take.",
  section: 'Expressions',
  tags: ["expression.panSymlog","expression.zoomSymlog","scale.constant","signal.on.between"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/scales.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
