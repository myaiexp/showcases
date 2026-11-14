// dexie-js example: update(): change some fields of one row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "update(): change some fields of one row",
  summary: "update() edits a stored row in place: only the fields you name change (amber cells), everything else stays. It answers 1 when it found the row and changed it.",
  section: 'Table',
  tags: ["update"],
  docs: ["repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
