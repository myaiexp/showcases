// dexie-js example: Every table is a property of db
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Every table is a property of db",
  summary: "Every table named in stores() becomes a property of the database: db.friends and db.pets. Each is its own list with its own ids, and a pet can carry a field, fur, that nobody declared.",
  section: "Getting started",
  tags: ["new Dexie", "version().stores()", "add", "clear", "Table"],
  docs: ["repo/docs/Tutorial/Design.md", "repo/docs/Version/Version.stores().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
