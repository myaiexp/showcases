// dexie-js example: upgrade(): split name into first and last
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "upgrade(): split name into first and last",
  summary: "Version 1 of the app saves one name field per person. Version 2 wants first and last name, so its upgrade() function rewrites every stored row once, the first time the new version opens. The grid changes shape and the new lastName index finds people.",
  section: "Schema and versions",
  tags: ["version().stores()", "upgrade", "modify", "close", "where().equals"],
  docs: ["repo/docs/Tutorial/Understanding-the-basics.md", "repo/docs/Dexie/Dexie.version().md", "repo/docs/Version/Version.upgrade().md", "repo/docs/Version/Version.md", "repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
