// dexie-js example: upgrade(): replace age with a birthdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "upgrade(): replace age with a birthdate",
  summary: "An age saved in a database goes stale every year, so version 2 stores a birthdate instead. Its upgrade() function turns each stored age into a date and removes the old field, and the new index sorts by birthdate.",
  section: "Schema and versions",
  tags: ["version().stores()", "upgrade", "modify", "orderBy", "Date"],
  docs: ["repo/docs/Dexie/Dexie.version().md", "repo/docs/Version/Version.upgrade().md", "repo/docs/Version/Version.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
