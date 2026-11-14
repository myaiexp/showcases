// dexie-js example: filter(): keep rows that pass a test
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "filter(): keep rows that pass a test",
  summary: "filter() runs your own test on every row, so it can look at fields that have no index, like shoe size here. The rows that pass light up and come back; the rest dim. In the full view, type a part of a name.",
  section: 'Table',
  tags: ["filter", "toArray"],
  docs: ["repo/docs/Table/Table.filter().md", "repo/docs/Collection/Collection.toArray().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
