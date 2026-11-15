// vega example: Expressions: warn, info and debug
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: warn, info and debug",
  summary:
    "Logging calls inside expressions return their last argument while writing to the console; a checkbox switches them on, a slider changes the logged value, and a table shows what each call returns.",
  section: 'Expressions',
  tags: ["expression.warn","expression.info","expression.debug","signal.bind"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/api/view.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
