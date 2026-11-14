// dexie-js example: offset(): skip the first N rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "offset(): skip the first N rows",
  summary: "offset(4) skips the first four rows. Combine it with limit() and you can page through a table, two rows per page here: page 1 is offset(0), page 2 is offset(2), and so on.",
  section: 'Table',
  tags: ["offset", "limit", "paging"],
  docs: ["repo/docs/Table/Table.offset().md", "repo/docs/Table/Table.limit().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
