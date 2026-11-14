// dexie-js example: on('blocked'): an old tab refuses to let go
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('blocked'): an old tab refuses to let go",
  summary: "If the old tab answers the versionchange event by saying no, the new tab's upgrade cannot start and its blocked event fires, which is the moment to tell the visitor to close other tabs. The upgrade resumes the instant the old tab lets go.",
  section: 'Dexie class',
  tags: ["on('blocked')","on('versionchange')","version()","close()"],
  docs: ["repo/docs/Dexie/Dexie.on.blocked.md","repo/docs/Dexie/Dexie.on.versionchange.md","repo/docs/Dexie/Dexie.on().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
