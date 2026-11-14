// dexie-js example: reverse() + offset(): skip rows from the end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reverse() + offset(): skip rows from the end",
  summary: "offset() always skips from the front, so to skip from the back turn the order around first. The first step skips the last two ids; the second skips the single oldest friend and takes the next two.",
  section: 'Table',
  tags: ["offset", "reverse", "orderBy", "limit"],
  docs: ["repo/docs/Table/Table.offset().md", "repo/docs/Table/Table.reverse().md", "repo/docs/Table/Table.orderBy().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
