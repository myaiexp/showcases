// dexie-js example: UpgradeError: a primary key cannot be changed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UpgradeError: a primary key cannot be changed",
  summary: "Version 2 tries to swap the table's primary key, which Dexie cannot do. The open fails with a red UpgradeError, later calls are refused with the cause attached, and version 1 still opens with both friends untouched.",
  section: "Errors",
  tags: ["UpgradeError","OpenFailedError","upgrade"],
  docs: ["repo/docs/DexieErrors/Dexie.UpgradeError.md","repo/docs/DexieErrors/Dexie.OpenFailedError.md","repo/docs/DexieErrors/Dexie.DatabaseClosedError.md","repo/docs/Version/Version.upgrade().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
