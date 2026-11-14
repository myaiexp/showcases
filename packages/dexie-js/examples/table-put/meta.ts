// dexie-js example: put(): add or replace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "put(): add or replace",
  summary: "put() does whichever is needed. With a free id it adds a new row (green), with a taken id it replaces the old row (amber cells where the values changed). You never have to check first.",
  section: 'Table',
  tags: ["put"],
  docs: ["repo/docs/Table/Table.put().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
