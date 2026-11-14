// dexie-js example: reverse(): newest id first
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reverse(): newest id first",
  summary: "reverse() turns the primary key order around, so the highest id comes first. Add limit(2) to get the two most recently numbered rows.",
  section: 'Table',
  tags: ["reverse", "limit"],
  docs: ["repo/docs/Table/Table.reverse().md", "repo/docs/Table/Table.limit().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
