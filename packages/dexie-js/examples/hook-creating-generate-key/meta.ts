// dexie-js example: A creating hook makes up the primary key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A creating hook makes up the primary key",
  summary: "The table has no auto-numbering, and the rows are added without an id. The hook returns a key built from the name, and Dexie uses it as the row's id. A key you pass yourself always wins.",
  section: "Hooks and middleware",
  tags: ["hook","creating","primary key"],
  docs: ["repo/docs/Table/Table.hook('creating').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
