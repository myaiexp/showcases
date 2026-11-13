// Perspective example: Migrating an old saved config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Migrating an old saved config",
  summary:
    "Tokens in older shapes (a 5.6 date_format, unknown 2.x keys, a 2.x expression list) fail validate(); migrate(\"viewer\") upgrades them, reporting the schema steps applied and any Dropped notices, and the result restores.",
  section: "Save and Restore",
  tags: ["migrate", "validate", "notices", "version", "expressions", "date_format"],
  docs: ["repo/docs/md/how_to/rust/migrate.md", "repo/docs/md/how_to/javascript/save_restore.md", "repo/docs/md/how_to/javascript/importing.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
