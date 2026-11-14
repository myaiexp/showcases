// dexie-js example: A fresh install skips the upgrader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A fresh install skips the upgrader",
  summary: "An upgrade() function is for people who already have the old database. A new visitor's database is built directly at the latest version and the upgrader never runs, while a returning visitor on version 1 gets their row converted.",
  section: "Schema and versions",
  tags: ["version().stores()", "upgrade", "modify", "close"],
  docs: ["repo/docs/Tutorial/Design.md", "repo/docs/Tutorial/Understanding-the-basics.md", "repo/docs/Version/Version.upgrade().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
