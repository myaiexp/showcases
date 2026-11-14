// dexie-js example: on('populate') seeds only once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('populate') seeds only once",
  summary: "on('populate') fills a brand new database with starter rows. It fires on the very first open only: opening again, or even upgrading to a new version, does not add them back, which the deleted starter row proves.",
  section: "Schema and versions",
  tags: ["on('populate')", "bulkAdd", "delete", "version()"],
  docs: ["repo/docs/Dexie/Dexie.on.populate.md", "repo/docs/Tutorial/Understanding-the-basics.md", "repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
