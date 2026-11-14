// query-from-object: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A query string from an object",
  summary:
    "Each .query() adds to the address of the one before: an object, a second object with a list, then a raw string. The address bar shows the pieces arriving and the new ones flash.",
  section: 'Addons',
  tags: ["query", "QueryStringAddon"],
  docs: ["repo/README.md", "repo/src/addons/queryString.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
