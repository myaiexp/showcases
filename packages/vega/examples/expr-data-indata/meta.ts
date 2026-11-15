// vega example: Expressions: indata and data()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: indata and data()",
  summary:
    "Ten bars; pressing one toggles its row in a picked data set. indata colours the picked bars and a caption lists them with data() and pluck.",
  section: 'Expressions',
  tags: ["expression.indata","expression.data","expression.pluck","data.on.toggle"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/triggers.md","repo/docs/docs/data.md","repo/docs/docs/event-streams.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
