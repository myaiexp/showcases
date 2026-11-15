// tanstack-charts example: rollingWindow orderBy and order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rollingWindow orderBy and order",
  summary:
    "Rows that arrive out of order are put in order by orderBy before windows are cut, and order descending runs the window from the other end. The input is shuffled; the select shows input order, orderBy ascending and orderBy descending with a forward-looking window.",
  section: "Data Transforms",
  tags: ["rollingWindow", "orderBy", "order", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
