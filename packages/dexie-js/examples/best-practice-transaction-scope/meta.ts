// dexie-js example: More than one write? Use a transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "More than one write? Use a transaction",
  summary: "Adding several people one call at a time leaves some of them behind when a later call fails. Wrapping the same calls in db.transaction() makes them all-or-nothing: the failing add undoes the ones before it.",
  section: "Getting started",
  tags: ["transaction", "add", "ConstraintError", "&name"],
  docs: ["repo/docs/Tutorial/Best-Practices.md", "repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
