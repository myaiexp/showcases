// dexie-js example: upsert(): update if it exists, else create
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "upsert(): update if it exists, else create",
  summary: "Give upsert() a key and some changes. If the row exists only those fields change; if it does not, a new row is built from the key and the changes. The answer tells you which happened.",
  section: 'Table',
  tags: ["upsert"],
  docs: ["repo/docs/Table/Table.upsert().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
