// dexie-js example: add(): you supply the key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "add(): you supply the key",
  summary: "Some tables keep the key outside the row: the row is just the data and you name its key when you store it. The grid adds a key column so you can see which row sits under which key.",
  section: 'Table',
  tags: ["add", "outbound key"],
  docs: ["repo/docs/Table/Table.add().md", "repo/docs/inbound.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
