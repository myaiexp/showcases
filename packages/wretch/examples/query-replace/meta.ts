// query-replace: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Replace the query instead of adding",
  summary:
    "The client starts with ?page=2&sort=name. Adding a filter keeps both, while { replace: true } throws the old query away. The address the server received shows the difference.",
  section: 'Addons',
  tags: ["query", "replace", "QueryStringAddon"],
  docs: ["repo/README.md", "repo/src/addons/queryString.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
