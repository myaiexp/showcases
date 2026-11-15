// vega example: Expressions: datum, event and Signal Names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: datum, event and Signal Names",
  summary:
    "Hover a bar: a signal handler packs datum, event and x() fields into an object, and a table reads it back next to a second signal used by name.",
  section: 'Expressions',
  tags: ["expression.datum","expression.event","signal.on"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/signals.md","repo/docs/docs/event-streams.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
