// query-arrays: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lists in the query",
  summary:
    "A list in .query() repeats the key (tag=outdoor&tag=clothing), which is how a shop can filter by several tags at once. The products the shop shows narrow as tags are added.",
  section: 'Addons',
  tags: ["query", "arrays", "QueryStringAddon"],
  docs: ["repo/src/addons/queryString.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
