// dexie-js example: orderBy(): sort by an index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "orderBy(): sort by an index",
  summary: "The grid shows the table in id order, but orderBy() reads it back sorted by any indexed field: name, age, or the primary key (':id'). The answer panel numbers the rows in the order they come back.",
  section: 'Table',
  tags: ["orderBy", "toArray"],
  docs: ["repo/docs/Table/Table.orderBy().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
