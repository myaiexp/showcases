// vega example: Expressions: xy, item and group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: xy, item and group",
  summary:
    "Hover a panel of four circles: a handler inside the group reads the pointer with x(), y() and xy(group()), and names the item under it with item(); crosshair rules follow in panel space.",
  section: 'Expressions',
  tags: ["expression.xy","expression.x","expression.item","expression.group","signal.on"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md","repo/docs/docs/marks/group.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
