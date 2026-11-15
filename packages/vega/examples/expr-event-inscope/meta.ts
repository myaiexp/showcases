// vega example: Expressions: inScope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: inScope",
  summary:
    "A handler defined in a group listens to the whole view; pointing at circles in the group or at pink ones outside it, inScope(item()) says which side the item is on.",
  section: 'Expressions',
  tags: ["expression.inScope","expression.item","signal.on","signal.on.events.source"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/event-streams.md","repo/docs/docs/signals.md","repo/docs/docs/marks/group.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
