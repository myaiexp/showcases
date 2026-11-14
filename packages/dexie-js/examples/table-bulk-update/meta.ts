// dexie-js example: bulkUpdate(): many edits at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkUpdate(): many edits at once",
  summary: "Each entry names a key and the changes for that row. Rows that exist are edited, a key that does not exist is quietly skipped, and the answer counts how many were found. Setting a field to undefined removes it.",
  section: 'Table',
  tags: ["bulkUpdate"],
  docs: ["repo/docs/Table/Table.bulkUpdate().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
