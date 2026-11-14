// dexie-js example: &email: a duplicate is refused
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "&email: a duplicate is refused",
  summary: "An ampersand in front of an index name means no two rows may share that value. A second row with the same email is refused and the grid stays as it was, while a repeated name, which is not unique, goes in without trouble.",
  section: "Schema and versions",
  tags: ["stores", "&email", "add", "ConstraintError"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Understanding-the-basics.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
